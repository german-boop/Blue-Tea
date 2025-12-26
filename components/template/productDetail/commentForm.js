"use client"
import React, { useState } from 'react'
import styles from "./commentForm.module.css"
import { usePost } from '@/utils/hooks/useReactQueryPublic';
import { showSwal } from '@/utils/helper';

export default function CommentForm({ productID }) {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [score, setScore] = useState('');
    const [body, setBody] = useState('');

    const { mutate, isLoading } = usePost('/comments', {
        onSuccess: () => {
            showSwal("Your Comment Sent Successfully :)")
            setName('');
            setEmail('');
            setScore('5');
            setBody('');
        }
    });

    const sentComment = (e) => {
        e.preventDefault();
        const commentData = { username, email, score, body, productID };
        mutate(commentData);
    };
    return (
        <div className={styles.card_body}>
            <h5>Add Your Review</h5>
            <form onSubmit={(e) => sentComment(e)}>
                <div className="mb-3">
                    <label htmlFor="reviewName"
                        className=" text-white form-label">Name</label>
                    <input type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="reviewName"
                        placeholder="Your name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="reviewEmail"
                        className="text-white form-label">Email</label>
                    <input type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="reviewEmail"
                        placeholder="Your Email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="reviewRating" className="form-label text-white">Rating</label>
                    <select className="text-white form-select"
                        onChange={(e) => setScore(e.target.value)}
                        id="reviewRating">
                        <option value="5">★★★★★</option>
                        <option value="4">★★★★☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="1">★☆☆☆☆</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="reviewText"
                        className="text-white form-label">Comment</label>
                    <textarea
                        onChange={(e) => setBody(e.target.value)}
                        className="form-control"
                        id="reviewText"
                        rows="3"
                        placeholder="Write your review"></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.btn}>
                    {isLoading ? "Loading..." : "  Submit Review"}
                </button>
            </form>
        </div>

    )
}
