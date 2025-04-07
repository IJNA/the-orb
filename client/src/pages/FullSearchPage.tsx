import React, { useEffect, useMemo, useState, useRef, forwardRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetNostrSearchResults } from "../utils/Queries";
import { Box, Button, Container, Loader } from "react-bulma-components";
import styles from "./FullSearchPage.module.scss";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { PassageCard } from "../components/PassageCard";
import { getDetailsByBookTitle } from "../utils/BookSectionMap";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import Highlighter from "react-highlight-words";

export const FullSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { data: results, isLoading: isSearching } = useGetNostrSearchResults(query ?? "");
    const groupedResults = useMemo(() => groupBy(results, "title") ?? [], [results]);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    return (
        <div className={styles.searchPageContainer}>
            <div className={styles.searchHeader}>
                <ArrowLeft fontSize={32} onClick={() => navigate(-1)} className="is-clickable" />
                <h3 className={styles.searchHeaderText}>{isSearching ? `Searching for '${query}'` : `${results.length} results for '${query}'`}</h3>
                <div />
            </div>

            {isSearching ? (
                <div className={styles.loadingContainer}>
                    <Loader />
                </div>
            ) : (
                <TabGroup className={styles.tabGroup} selectedIndex={activeTab} onChange={setActiveTab}>
                    <TabList className={styles.tabList}>
                        {groupedResults?.map((result, index) => {
                            const book = getDetailsByBookTitle(result[0]);
                            if (!book) return null;
                            return (
                                <Tab key={index} as={TabButton}>
                                    {book.title} ({result[1].length})
                                </Tab>
                            );
                        })}
                    </TabList>
                    <TabPanels className={styles.resultsContainer}>
                        {groupedResults?.map((group) => (
                            <TabPanel key={group[0]}>
                                {group[1].map((item, index) => {
                                    const book = getDetailsByBookTitle(item.title);
                                    if (!book?.route) return null;
                                    return (
                                        <PassageCard
                                            key={index}
                                            reference={`${book.title} ${item.chapter}:${item.verse}`}
                                            textElement={<Highlighter highlightClassName={styles.boldText} searchWords={[query?.trim() ?? ""]} autoEscape={true} textToHighlight={item.value} />}
                                            route={`${book.route}/${item.chapter}/${item.verse}`}
                                            text={item.value}
                                        />
                                    );
                                })}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            )}
        </div>
    );
};

const groupBy = <T extends { verse: string; chapter?: string; title: string }, K extends keyof T>(items: T[], key: K) => {
    const uniqueItems = new Map<string, T>();

    items.forEach((item) => {
        const itemKey = String(item[key]);
        const uniqueKey = `${itemKey}-${item.chapter || "0"}-${item.verse}`;

        if (!uniqueItems.has(uniqueKey)) {
            uniqueItems.set(uniqueKey, item);
        }
    });

    const uniqueItemsArray = Array.from(uniqueItems.values());

    return Object.entries(
        uniqueItemsArray.reduce(
            (result, item) => ({
                ...result,
                [String(item[key])]: [...(result[String(item[key])] || []), item],
            }),
            {} as Record<string, T[]>
        )
    )
        .sort((a, b) => {
            const lengthDiff = b[1].length - a[1].length;
            if (lengthDiff !== 0) return lengthDiff;
            return a[0].localeCompare(b[0]);
        })
        .map(([title, items]) => [
            title,
            items.sort((a, b) => {
                const chapterA = parseInt(a.chapter || "0");
                const chapterB = parseInt(b.chapter || "0");
                const chapterDiff = chapterA - chapterB;
                if (chapterDiff !== 0) return chapterDiff;
                return parseInt(a.verse) - parseInt(b.verse);
            }),
        ]) as [string, T[]][];
};

const toProperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const TabButton = forwardRef((props: any, ref: any) => {
    const isSelected = props["data-headlessui-state"] === "selected";
    return <Button className={styles.tabButton} size="small" color={!isSelected ? "light" : "black"} {...props} domRef={ref} />;
});
