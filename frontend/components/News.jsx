import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from './Spinner';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        updateNews();
        document.title = `NewsPulse - ${props.category[0].toUpperCase() + props.category.slice(1)}`;
    }, [page]);

    const updateNews = async () => {
        const url = `https://newspulseapi.onrender.com/api/news?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        try {
            const response = await fetch(url);
            console.log(response);
            if (response.ok) {
                const parsedData = await response.json();
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);

    };

    const handlePreviousClick = () => {
        setPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="container my-3">
            <h3 className="text-center" id="mainHeading" style={{ fontSize: '35px', fontWeight: 'bold', marginTop: '70px' }}>
                Top Headlines in {props.category[0].toUpperCase() + props.category.slice(1)}
            </h3>
            <div className="row">
                {loading && <Spinner />}
                {!loading &&
                    articles.map((element) => (
                        <div className="col-md-3" key={element.url}>
                            <NewsItem
                                title={element.title ? `${element.title.slice(0, 45)}...` : ''}
                                description={element.description ? element.description.slice(0, 88) : ''}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                            />
                        </div>
                    ))}
            </div>

            <div className="container d-flex justify-content-between">
                <CButton
                    disabled={page <= 1}
                    color="dark"
                    onClick={handlePreviousClick}
                    className="me-2"
                >
                    Previous
                </CButton>
                <CButton
                    disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
                    color="dark"
                    onClick={handleNextClick}
                >
                    Next
                </CButton>
            </div>
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
