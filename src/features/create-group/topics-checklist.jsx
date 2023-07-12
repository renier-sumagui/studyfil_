export function TopicsChecklist({ modalRef }) {
    const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6', 'Topic 7', 'Topic 8']


    function closeModal(event) {
        event.preventDefault();
        modalRef.current.close();
    }

    return (
        <dialog ref={modalRef}>
                <label><input type="checkbox" value="Topic 1" /> Topic 1</label>
                {topics.map((topic) => {
                    return <label key={topic}><input type="checkbox" value={topic} /> {topic} </label>
                })}
                <button onClick={(e) => closeModal(e)}>Close</button>
        </dialog>
    )
}