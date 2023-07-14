import { useState, useEffect } from 'react';
import { PostQuestion } from 'features/group-forum';
import { PostCard } from 'features/group-forum';
import { usePosts } from './use-posts.js';
import { useGroupContext } from 'features/group-forum';
import { Circular } from 'features/loading';

export function Discussion() {
    const [posts, setPosts] = useState();
    const { group } = useGroupContext();
    const [loading, setLoading] = useState(false);
    const [helperText, setHelperText] = useState();
    const [seed, setSeed] = useState(1);

    useEffect(() => {
        (async function() {
            setPosts();
            setLoading(true);
            const response = await usePosts(group.id);
            setLoading(false);
            if (response.hasPosts) {
                const temp = response.posts.map((post) => {
                    return <PostCard 
                                key={post.id}
                                postId={post.id} 
                                username={post.username} 
                                fullName={post.fullName}
                                country={post.country}
                                content={post.content}
                                answers={post.answers}
                                timePosted={post.timePosted}
                                isResolved={post.isResolved}
                                setSeed={setSeed}
                            />
                });
                setHelperText(null);
                setPosts(temp);
            } else {
                setHelperText(<p style={{ fontWeight: 'bold', color: 'gray', textAlign: 'center'}}>Forum has no posts yet.</p>)
            }
        })()
    }, [seed])

    return (
        <div>
            <h2 style={{ marginBottom: "10px" }}>Discussion Forum</h2>
            <PostQuestion setSeed={setSeed} />
            {posts ? posts.map((post) => post) : null}
            {loading && <Circular />}
            {helperText && helperText}
        </div>
    )
}