import React from 'react';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import imageNotAvailable from './imageNotAvailable.jpg';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
        <div className="my-3">
            <CCard>
                <CCardImage orientation="top" src={imageUrl ? imageUrl : imageNotAvailable} />
                <CCardBody>
                    <CCardTitle>{title}</CCardTitle>
                    <CCardText>{description}</CCardText>
                    <CCardText><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></CCardText>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </CCardBody>
            </CCard>
        </div>
    );
}

export default NewsItem;
