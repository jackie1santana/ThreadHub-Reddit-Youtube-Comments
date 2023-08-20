/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect, FC } from 'react'
import Avatar from '@mui/material/Avatar';
import { CommentForm_2ndVersion } from './CommentForm_2ndVersion'
import { Comment_2ndVersion } from './Comment_2ndVersion';



interface ITextArea {
  text: string;
  fileUpload: File | null | undefined;
  fileName: string | null | undefined;
  fileSize: number | null | undefined;
  fileType: string | null | undefined;
  lastModifiedDate: Date | string | null | undefined;
  activeFormats: Array<string> | [];
}

export const CommentsList_2ndVersion:FC<Readonly<any>> = ({ 
  title = 'Comments',
  maxCharacterCount, 
  currentUserId, 
  currentUserAvatar,
  getCommentApiResponse, 
  fullCommentSectionApiData,
  placeHolder, 
  submitLabel, 
  apiActionType,
  commentFormAtBottom,
  turnOffAddToComment,
  turnOffNestedReplies,
  redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT,
  youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT,
  maxRecursionLimit,
  turnOnMarkCommentAsResolution,
  setDefaultTextWhenThereAreNoComments,
}): JSX.Element => {
const backendCommentsInitialState = {
  comments: [
    {
        id: -1,
        currentUserId: '',
        parentId: -1,
        commenterName: '',
        initials: '',
        avatar: '',
        comment: '',
        created: '',
        draft: null,
        draftContent: '',
        isEdit: null,
        likesData: {
            userLiked: null,
        },
        metrics: null,
        showComments: null,
        showDelete: null,
        showEdit: null,
        showLikes: null,
        updated: '',
    },
  ],
} 

const [backendComments, setBackendComments] = useState([]);

// This allows me to track which comment currently editing or replying
const [activeComment, setActiveComment] = useState(null);

// for mark resolution
const [checked, setChecked] = React.useState(false);

// root comments are parent_id = null
const rootComments = getCommentApiResponse && backendComments?.filter(be_comment => be_comment?.parentId === null);

const flattenRecursiveComments = (baseArray: any[]): any[] => {
  let result: Array<any> = [];

  baseArray.forEach((recursiveNestedArray): any[] => {    
      result.push(recursiveNestedArray);
      if (Array.isArray(recursiveNestedArray.replies)) return result = result.concat(flattenRecursiveComments(recursiveNestedArray.replies));
  });
  
  return result;
}

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(
'flat',
flattenRecursiveComments(backendComments),
)

// let recursionCount = 0;
const getReplies = (commentId: number): any[] => {
  // recursionCount++;

  // if parentId matches a comment Id then it is a reply
  // const replies: any[] = backendComments.filter(be_comment => be_comment.replies.filter(reply => reply.parentId === commentId))
//   const flattenArray = backendComments.flat(Infinity);
// console.log(flattenArray, 'flat');

if (redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true) {
// if you have a Russian doll style comment data structure you have to flatten it first (like impact zone comments)
const replies: any[] = flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId === commentId)
.sort((a, z) => new Date(a.created).getTime() - new Date(z.created).getTime())

return replies;
}

// If you do not need to flatten your data structure use this

const replies: any[] = backendComments.filter(be_comment => be_comment.parentId === commentId)
.sort((a, z) => new Date(a.created).getTime() - new Date(z.created).getTime())

  return replies;
}

type TCreateComment = (text: string, parentId?: number | null, metrics?: any[]) => Promise<{
  id: number;
  currentUserId: string | number;
  comment: string;
  parentId: number | null;
  created: Date | string;
  metrics?: any[]
}>

const createComment: TCreateComment = async (text, parentId = null, metrics?: any[]) => ({
  	id: Math.floor(Math.random() * 1_000_000) + 1, 
    currentUserId,
    avatar: '',
    comment: text,
    parentId,
    created: new Date(),
    metrics: metrics ?? null,
  });

const addComment = (text: string, parentId: number | null, metrics?: any[]) => {
  createComment(text, parentId, metrics).then(comment => {
    // place comment to the beginning
    setBackendComments([comment, ...backendComments]);
    // This shows when I am no longer editing or replying
    setActiveComment(null);

    // ITS UP TO THE BACKEND TO PUSH THESE COMMENTS ON RECURSIVELY BY MATCHING IF THE PARENT ID MATCHES ANY COMMENT ID FROM THE REPLIES []
    // BACKEND HAS TO ADD COMMENTER NAME FROM THE COOKIE SESSION ID
    // callFeedbackHubAction(apiActionType, {
    //     addNewComment: {
    //       parentId,
    //       text,
    //       markResolution: checked,
    //     },
    // });
  })
}

const deleteCommentApi = async (commentId: number): Promise<{}> => ({});

const deleteComment = (commentId: number): void => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    deleteCommentApi(commentId).then(() => {
      const updatedBackEndComments = backendComments.filter(be_comment => be_comment.id !== commentId);

      setBackendComments(updatedBackEndComments);
      
      // callFeedbackHubAction(apiActionType, {
      //     deleteComment: {
      //       commentId,
      //     },
      // });
    })
  }
}
  
const updateCommentApi = async (text, commentId) => ({ text });

const updateComment = (text: string, commentId: number | null) => {
  updateCommentApi(text, commentId).then(() => { 
    const updatedBackEndComments: any[] = backendComments?.map(be_comment => {
      if (be_comment.id === commentId) {
        return {
          ...be_comment,
          comment: text,
        };
      }
      return be_comment;
    })
    // .sort((a,z) =>
    // new Date(a.created).getTime() - new Date(z.created).getTime());
    setBackendComments(updatedBackEndComments);
    setActiveComment(null);

    // callFeedbackHubAction(apiActionType, { 
    //     updateAndSaveData: {
    //       commentId,
    //       text,
    //     },
    // });
  });
};

const checkForFlatArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error('Input is not an array.');
  }
  for (let i = 0; i < arr.length; i++) {
    // you can set arr[i].replies the name to whatever array name that is for your nested children
    if (arr[i] && Array.isArray(arr[i].replies) || Array.isArray(arr[i].comments)) {
      throw new Error(`This error is occurring because both comment style props must be applied. 
      If they are already applied, then a flat data structure array is needed when using the 
      'youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT' prop. A nested array of objects 
      data structure cannot be used in this case. To use a nested array of objects, set the 
      'redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT' prop to 'true' to flatten the nested array.
      If you still are receiving an error, please check your data structure and make sure your replies array
       begin with a key property of 'replies' or 'comments' and that it is an array of objects.`);
    }
  }
}

useEffect(() => {
  if (redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === false) {
    checkForFlatArray(getCommentApiResponse);
  }
  setBackendComments(getCommentApiResponse);
}, [])

  // flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId === null).length + flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId !== null).length
            // : flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId === null).length
            // turnOffNestedReplies !== true ?
            // backendComments.filter(be_comment => be_comment.parentId === null).length + backendComments.filter(be_comment => be_comment.parentId !== null).length
            // : backendComments.filter(be_comment => be_comment.parentId === null).length
const CommentsCounter = (): number => {
    switch (true) {
      case (turnOffNestedReplies !== true && !redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true && youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT):
        return backendComments.filter(be_comment => be_comment.parentId === null).length + backendComments.filter(be_comment => be_comment.parentId !== null).length
      case (!turnOffNestedReplies !== true && !redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true && youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT):
        return backendComments.filter(be_comment => be_comment.parentId === null).length
      case (turnOffNestedReplies !== true && redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true && !youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT):
          return flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId === null).length + flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId !== null).length
      case (!turnOffNestedReplies !== true && redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true && !youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT):
        return flattenRecursiveComments(backendComments).filter(be_comment => be_comment.parentId === null).length
      default:
        return backendComments.filter(comment => !comment.parentId).length + backendComments.filter(comment => comment.parentId !== null).length;
    }
}
console.log('backend state', backendComments)
  return (
    <div className="thread-main-page-2nd">

<div className="form-wrapper">
       
{turnOffAddToComment ? <></> : (
        <>
          <h1> {CommentsCounter()} Comments</h1>
          {
            // flat(backendComments).length === 0 && ( (IF NESTED)
            rootComments.length === 0 && (
              <div className={`no-comments-${Boolean(setDefaultTextWhenThereAreNoComments)}`}>
                { setDefaultTextWhenThereAreNoComments }
              </div>
            )
          }

        </>
      )}

<h2 className="comments-title">{ title }</h2>
          <div className="comment-form-avatar-bottom">
          {
              currentUserAvatar !== null
              && currentUserAvatar !== undefined
              && <span className="comment-form-image-container"><Avatar alt="current user avatar" src={currentUserAvatar} /></span>
            }

            <div>
              <CommentForm_2ndVersion
                getCommentApiResponse={getCommentApiResponse}
                fullCommentSectionApiData={fullCommentSectionApiData}
                checked={checked}
                setChecked={setChecked}
                maxCharacterCount={maxCharacterCount} 
                placeHolder={placeHolder}
                handleSubmit={addComment}
                submitLabel={submitLabel}

                turnOnMarkCommentAsResolution={turnOnMarkCommentAsResolution}
              />
            </div>
          </div>
</div>
 

        <div className="threaded-comments">


          <div className="comments-container">
            {rootComments?.map(rootComment => (
              <Comment_2ndVersion
                applyCommentsResolvedClassName={`comments-resolved-${rootComment.markAsResolved}`}
                fullCommentSectionApiData={fullCommentSectionApiData}
                key={rootComment.id} 
                addComment={addComment}
              
                comment={rootComment} 
                replies={getReplies(rootComment.id)} 
                getNestedReplies={getReplies}
                redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT={redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT}
                youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT={youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT}
                maxRecursionLimit={maxRecursionLimit}
                currentUserId={currentUserId} 
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
               
                turnOffNestedReplies={turnOffNestedReplies}
                turnOffAddToComment={turnOffAddToComment}
                maxCharacterCount={maxCharacterCount}
              />
            ))
            }
          </div>
        {/* total = root comment + replies */}
        {/* If replies are turned off then only show total of root comments and do not show replies else show both total */}
       
      </div>
    </div>
  )
}
