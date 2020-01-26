import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../../typings/entities';
import Tag from '../../components/tag/tag';
import styles from './note.module.css';

interface NoteProps {
    data: {
        markdownRemark: {
            frontmatter: NoteFrontmatter;
            html: string;
        };
    };
}

export const pageQuery = graphql`
    query($url: String) {
        markdownRemark(frontmatter: { path: { eq: $url } }) {
            html
            frontmatter {
                path
                title
                tags
            }
        }
    }
`;

export default function Note({ data }: NoteProps): React.ReactElement {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    return (
        <React.Fragment>
            <div className={styles.page}>
                <div className={styles.tags}>
                    {frontmatter.tags.map(name => (
                        <Tag key={name} name={name} />
                    ))}
                </div>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </React.Fragment>
    );
}