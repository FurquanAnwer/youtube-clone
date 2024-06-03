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
          <div key={comment.id} className='flex mb-4 border-t p-2'>
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


//   function AddCommentForm({ videoId }) {
//     const [newComment, setNewComment] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(
//                 `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyBm1dmqgLQyiooa6khtY6kVNZlye8nw2LM`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         snippet: {
//                             videoId,
//                             topLevelComment: {
//                                 snippet: {
//                                     textOriginal: newComment,
//                                 },
//                             },
//                         },
//                     }),
//                 }
//             );
//             const data = await response.json();
//             console.log('Comment added:', data);
//             setNewComment('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
//     };

//     return (
//         <div className="w-full">
//             <form onSubmit={handleSubmit} className="w-full">
//                 <textarea
//                     className="w-full p-2 mb-2 border border-gray-300 rounded"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Add a comment..."
//                     rows="4"
//                 />
//                 <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
//                     Comment
//                 </button>
//             </form>
//         </div>
//     );
// }
  
function AddCommentForm({ videoId }) {
  const [newComment, setNewComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(
              `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyBm1dmqgLQyiooa6khtY6kVNZlye8nw2LM`,
              {
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
              }
          );
          const data = await response.json();
          console.log('Comment added:', data);
          setNewComment('');
          setIsFocused(false);
      } catch (error) {
          console.error('Error adding comment:', error);
      }
  };

  return (
      <div className="w-full flex flex-col items-start">
          <div className="flex items-start w-full mb-4">
              <img
                  className="rounded-full h-10 w-10 mr-4"
                  src="https://via.placeholder.com/150"
                  alt="User Profile"
              />
              <form onSubmit={handleSubmit} className="flex-grow">
                  <textarea
                      className={`w-full p-2 mb-2 border ${isFocused ? 'border-blue-500' : 'border-gray-300'} rounded transition-all`}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={isFocused ? '4' : '1'}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(newComment !== '')}
                  />
                  {isFocused && (
                      <div className="flex justify-end space-x-2">
                          <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 rounded"
                              onClick={() => {
                                  setNewComment('');
                                  setIsFocused(false);
                              }}
                          >
                              Cancel
                          </button>
                          <button
                              type="submit"
                              className="px-4 py-2 text-white bg-blue-500 rounded"
                          >
                              Comment
                          </button>
                      </div>
                  )}
              </form>
          </div>
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
        {/* <CommentsList comments= {info}/> */}
        <AddCommentForm videoId={videoId}/>
        {/* <Comment data = {info}/> */}
        <CommentsSection videoId={videoId}/>
    </div>
  )
}

export default CommentsContainer