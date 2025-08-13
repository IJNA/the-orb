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
import { orderBooks } from "../utils/NostrUtils";

export const FullSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { data: results, isLoading: isSearching } = useGetNostrSearchResults(query ?? "");
    const groupedResults = useMemo(() => orderBooks(results) ?? [], [results]);
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
                                            text={item?.value ?? ""}
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

const TabButton = forwardRef((props: any, ref: any) => {
    const isSelected = props["data-headlessui-state"] === "selected";
    return <Button className={styles.tabButton} size="small" color={!isSelected ? "light" : "black"} {...props} domRef={ref} />;
});
