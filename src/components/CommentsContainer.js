import React from 'react'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const info = {
    name : "furquan",
    text : "good video",
    replies : "no replies"
};


// Function to fetch comments for a video
async function fetchComments(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyBm1dmqgLQyiooa6khtY6kVNZlye8nw2LM`);
    const data = await response.json();
    return data.items;
}


function CommentsSection({ videoId }) {
    const [comments, setComments] = useState([]);
      
    useEffect(() => {
      fetchComments(videoId)
        .then(items => {
          setComments(items);
          console.log(comments);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }, [videoId]);
  
    return (
      <div>
        
        {comments.map(comment => (
          <div key={comment.id} className='flex mb-4 border-t p-1'>
            <img className='w-12 h-12 rounded-full mr-4' src = {comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='user image'/> 
            <div>
            <span className='font-semibold'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
            </div>
            {/* <hr className="my-4 w-full border-gray-300" /> */}
          </div>
        ))}
      </div>
    );
  }


  function AddCommentForm({ videoId }) {
    const [newComment, setNewComment] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyBm1dmqgLQyiooa6khtY6kVNZlye8nw2LM`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            snippet: {
              videoId,
              topLevelComment: {
                snippet: {
                  textOriginal: newComment,
                },
              },
            },
          }),
        });
        const data = await response.json();
        console.log('Comment added:', data);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
        <textarea
          className='p-2'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="4"
          cols="50"
        />
        <button type="submit">Comment</button>
      </form>
        </div>
      
    );
  }  
  

  
// const Comment = ({data})=>{
//     const {name,text,replies} = data;
//     return(
//         <div className='flex'>
//             <img
//             className='w-12 h-12'
//             src=""
//             alt="">
//             </img>
//             <div className='px-3'>
//                 <p className='font-bold'>{name}</p>
//                 <p>{text}</p>
//             </div>
//         </div>
//     );
// };

// const CommentsList = ({comments}) =>{
//     return comments.map((comment)=><Comment data={comment}/>);
// }

const CommentsContainer = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
      
  return (
    <div className='m-5 p-2 shadow-lg bg-gray-100 rounded-lg'>
        <h1 className='text-2xl font-bold'>Comments:</h1>
        {/* <Comment data = {info}/> */}
        <CommentsSection videoId={videoId}/>
        {/* <CommentsList comments= {info}/> */}
        <AddCommentForm videoId={videoId}/>
    </div>
  )
}

export default CommentsContainer