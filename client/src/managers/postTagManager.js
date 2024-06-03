export const savePostTags = async (postId, tagIds) => {
    const response = await fetch(`http://localhost:5173/api/posttag/${postId}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tagIds)
    });
};


