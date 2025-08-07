import React, { useEffect, useMemo, useState, useRef, forwardRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetNostrSearchResults } from "../utils/Queries";
import { Box, Button, Container, Loader } from "react-bulma-components";
import styles from "./FullSearchPage.module.scss";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { PassageCard } from "../components/PassageCard";
import { getDetailsByBookTitle, getSectionByBookTitle, BookSectionMap } from "../utils/BookSectionMap";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import Highlighter from "react-highlight-words";

export const FullSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { data: results, isLoading: isSearching } = useGetNostrSearchResults(query ?? "");
    const groupedResults = useMemo(() => groupBy(results, "sectionName") ?? [], [results]);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query, activeTab]);

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
                        {groupedResults?.map((result, index) => (
                            <Tab key={index} as={TabButton}>
                                {result[0]} ({result[1].length})
                            </Tab>
                        ))}
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

const groupBy = <T extends { verse: string; chapter?: string; sectionName: string; title: string }, K extends keyof T>(items: T[], key: K) => {
    const uniqueItems = new Map<string, T>();

    items.forEach((item) => {
        const itemKey = String(item[key]);
        const uniqueKey = `${itemKey}-${item.chapter || "0"}-${item.verse}`;

        if (!uniqueItems.has(uniqueKey)) {
            uniqueItems.set(uniqueKey, item);
        }
    });

    const uniqueItemsArray = Array.from(uniqueItems.values());
    const groupedItems = uniqueItemsArray.reduce(
        (result, item) => ({
            ...result,
            [String(item[key])]: [...(result[String(item[key])] || []), item],
        }),
        {} as Record<string, T[]>
    );

    // Get the section order from BookSectionMap
    const getSectionOrder = (title: string) => {
        const section = getSectionByBookTitle(title);
        if (!section) return 999; // Default to end if not found
        
        // Find the index of the section in BookSectionMap.sections
        const sectionIndex = BookSectionMap.sections.findIndex((s: { title: string }) => s.title === section.title);
        return sectionIndex >= 0 ? sectionIndex : 999;
    };

    // Sort by Bible section order instead of by number of items
    const sortedGroupedItems = Object.entries(groupedItems).sort((a, b) => {
        // Get the first item from each group to determine the book
        const firstItemA = a[1][0];
        const firstItemB = b[1][0];
        
        if (!firstItemA || !firstItemB) {
            return 0; // Handle empty groups
        }
        
        // Compare by section order
        const sectionOrderA = getSectionOrder(firstItemA.title);
        const sectionOrderB = getSectionOrder(firstItemB.title);
        
        if (sectionOrderA !== sectionOrderB) {
            return sectionOrderA - sectionOrderB;
        }
        
        // If same section, sort by section name
        return a[0].localeCompare(b[0]);
    });

    return sortedGroupedItems.map(([sectionName, items]) => [
        sectionName,
        items.sort((a, b) => {
            //sort by book title
            const bookA = getDetailsByBookTitle(a.title);
            const bookB = getDetailsByBookTitle(b.title);
            if (bookA && bookB) {
                return bookA.title.localeCompare(bookB.title);
            }

            //sort by chapter
            const chapterA = parseInt(a.chapter || "0");
            const chapterB = parseInt(b.chapter || "0");
            const chapterDiff = chapterA - chapterB;
            if (chapterDiff !== 0) return chapterDiff;
            return parseInt(a.verse) - parseInt(b.verse);
        }),
    ]) as [string, T[]][];
};

const TabButton = forwardRef((props: any, ref: any) => {
    const isSelected = props["data-headlessui-state"] === "selected";
    return <Button className={styles.tabButton} size="small" color={!isSelected ? "light" : "black"} {...props} domRef={ref} />;
});
