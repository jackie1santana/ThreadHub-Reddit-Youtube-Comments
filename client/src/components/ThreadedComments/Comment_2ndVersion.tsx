/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable camelcase */

import React, { VFC } from 'react';
// eslint-disable-next-line import/order
import { CommentForm_2ndVersion } from './CommentForm_2ndVersion';
import showTimeAgo from 'showtimeago'
import Avatar from '@mui/material/Avatar';

// Now you can use both IComment and mockData in this file

import {
 first, isNil, split, map, reject, 
} from 'lodash';

// eslint-disable-next-line import/no-unresolved
import './Comment_2ndVersion.scss';

export const Comment_2ndVersion:VFC<any> = ({
  comment,

  replies,
  getNestedReplies,
  recursionLevel = 0,
  repliedToString,
  currentUserId,
  updateComment,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  feedbackHubState,
  callFeedbackHubAction,
  turnOffAddToComment,
  turnOffNestedReplies,
  redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT,
  youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT,
  maxRecursionLimit,
  maxCharacterCount,
   fullCommentSectionApiData,
  applyCommentsResolvedClassName,
}) => {
  const [isReplyDisabled, setIsReplyDisabled] = React.useState<boolean>(false);

    React.useEffect(() => {
      // it will never get so 50 as long as you set a maxRecursionLimit.. Even then the default maxRecursionLimit is 5
      if (recursionLevel >= maxRecursionLimit && recursionLevel <= 50) {
          setIsReplyDisabled(true);
        }
    }, [recursionLevel]);
 
    const IsThisTheCurrentLoggedInUser = Boolean(currentUserId)
    // common after 5 minutes have passed yAou can no longer added or delete
    const fiveMinutes = 300_000;

    const timePassed: boolean = Date.now() - new Date(comment.created).getTime() > fiveMinutes;

    const canReply: boolean = IsThisTheCurrentLoggedInUser && turnOffNestedReplies !== true && !isReplyDisabled

    const canEdit: boolean = currentUserId === comment.currentUserId && !timePassed;

    const canDelete: boolean = currentUserId === comment.currentUserId && !timePassed;

    const createdAt: string = comment.created

    const isReplying: boolean = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;

    const isEditing: boolean = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;

    // When a top level comment is added it sets the parents id to null (root comment) which is the comment.id
    //  parentId(reply Id assigned recursively) ? parentId(reply Id assigned recursively): comment.id;
    // i know it's confusing but this checks if there is a replyId ? if not then shpw the top level root comment (root comment aka comment.id)
    const replyId: number = parentId || comment.id;

// This may soon be a feature
    // const [showSubComments, setShowSubComments]: [
    //   boolean, React.Dispatch<React.SetStateAction<boolean | ((prevState: boolean) => boolean)>>
    // ] = React.useState<boolean>(false);

  //   const openSubComments = (): void => {
  //     setShowSubComments(!showSubComments);
  // };
  // const handleAddReply = (text: string) => {
  //   addReply(text, comment.id);
  // };

// console.log('get replies', replies)

  const renderReplies = (replies: any[], recursionLevel = 0) => 
    // if (recursionLevel >= redditStyleCommentThread.recursionLimit) {
   
    //   console.log(recursionLevel, 'recursionCount hit max')
    // }

    // console.log(recursionLevel, 'recursionCount')
     (
      replies?.map((reply: any, index: number) => {
        // const repliedToString: string = `${index === 0 ? comment.commenterName : replies[ index - 1 ].commenterName}`
        // This works for reddit comments but not youtube comments
         const repliedToString = `${first(split(fullCommentSectionApiData?.commentsData?.comments?.find(c => c.id !== comment.parentId) && comment?.commenterName))}`;
       
//         let repliedToString;
// if (!comment.parentId) { 
//   repliedToString = replies[ index - 1 ]?.commenterName
// } else {
//   const parentComment = fullCommentSectionApiData.commentsData.comments.find(c => c.id === comment.parentId);
//   repliedToString = parentComment.parentId ? `${first(split(parentComment.commenterName, ' '))}` : replies[ index - 1 ]?.commenterName;
// }
        
        return (
          <Comment_2ndVersion
          fullCommentSectionApiData={fullCommentSectionApiData}
          key={reply.id}
          comment={reply}
          repliedToString={repliedToString}

          // replies={_replies}
          
          // on comment this if you want to add one level of replies
          // replies={[]}

          // If this is a youtube comment style this is one level, so show no Children
          // If this is a REDDIT comment style than render out or the children by passing in the replyId recursively
          // pass this id to get or nested, this will also allow you to add replies to replies
         
          replies={redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true 
           && youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT === false ? getNestedReplies(reply.id) : []}

          // getNestedReplies will recursively be mv passed down to the replies prop above
          getNestedReplies={getNestedReplies}
          recursionLevel={recursionLevel + 1} 
          redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT={redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT}
          youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT={youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT}
          maxRecursionLimit={maxRecursionLimit}
          currentUserId={currentUserId}
          deleteComment={deleteComment}
          addComment={addComment}
          // provide the parentId of the root level comment if this is a youtube comment style
          // If this is a REDDIT comment style then provide the parentId of the reply
          parentId={redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT === true 
            && youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT === false ? reply.id : comment.id}

          // parentId matches the id of the comment that is being replied to
          // parentId={reply.id}
          
          feedbackHubState={feedbackHubState}
          callFeedbackHubAction={callFeedbackHubAction}
          setActiveComment={setActiveComment}
          activeComment={activeComment}
          updateComment={updateComment}
          turnOffAddToComment={turnOffAddToComment}
          turnOffNestedReplies={turnOffNestedReplies}
        />
        )
      })
        );
const renderMetrics: (metrics: any[]) => JSX.Element[] = (metrics) => {
        const iconMap = {
          comments: 'comment',
          follows: 'star',
          likes: 'heart-hollow',
          views: 'eye',
        };
        return metrics?.map((metric: any) => {
          const { name, count } = metric;

            return (<li className="comment-metric" role="listitem">
            
                <span className="count">{ count }</span>
              </li>);
        });
      };

  return (
    <div className="comment">
        {/* if comment-resolved-true then show those comments w/ styles attached */}
        <div className={`${applyCommentsResolvedClassName} comment-right-part`}>
         <div className="comment-avatar-timestamp">
          <div className="comment-image-container">

            <Avatar alt="commenter avatar" src={ comment.avatar } style={{ width: '4.15rem' }}/>
          </div>
          <div className="comment-content">
              <div className="comment-author">{ comment.commenterName }</div>
              <div className="comment-action">&nbsp;{ `• ${isNil(parentId) ? 'commented •' : `replied to ${repliedToString} •`}` }</div>
              <div> { showTimeAgo(createdAt) }</div>
          </div>
        </div>
        {!isEditing
          && <div className="comment-text">{ comment.comment }</div>
        }

<div className="comment-metrics-container">
              <ul className="comment-metrics-list">
                { renderMetrics(comment.metrics) }
              </ul>
      </div>
      </div>
      {
        isEditing && (
          <CommentForm_2ndVersion
            fullCommentSectionApiData={fullCommentSectionApiData}
            maxCharacterCount={500}
            submitLabel="Update"
            // If this is a youtube comment style then the replies prop is  []. When you update a reply it will update the comment with the parentId 
            // equal to the root comment id parent.id={comment.id}

                // If this is a REDDIT comment style then the replies prop is getReplies(reply.id) 
                // when you update a reply it will update the comment with the parent id that matches to the reply id(parent) 
            handleSubmit={(text: string) => updateComment(text, comment.id)}
            feedbackHubState={feedbackHubState}
            callFeedbackHubAction={callFeedbackHubAction}
            hasCancelButton
            handleCancel={() => setActiveComment(null)}
            initialText={comment.comment}
            turnOnMarkCommentAsResolution={false}
          />
        )
      }

      <div className="comment-actions">
        {turnOffAddToComment ? <></>
          : <>
            {canReply
              && <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply</div>
            }

            {canEdit
              && <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</div>
            }

            {canDelete
              && <div className="comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>
            }

            {isReplying && !isReplyDisabled && (
              <CommentForm_2ndVersion
                fullCommentSectionApiData={fullCommentSectionApiData}
                maxCharacterCount={maxCharacterCount}
                submitLabel="Reply"
                // If this is a youtube comment style then the replies prop is  []. When you add a reply it will apply the parentId which is 
                // equal to the root comment id parent.id={comment.id}, you can not have grandchildren

                // when using the youtube style and you add a reply onto another reply, it does not matter no matter what 
                // it will be a child of that specific root comment
                // so it will appear to stack down from top to bottom, because it does not add grandchildren in also 
                // this is because we are passing in the root comment id as the parentId here parentId={comment.id} (root comment id as parent id)

                // If this is a REDDIT comment style then the replies prop is getReplies(reply.id) 
                // when you add a reply it will apply the reply id(parent) as the parent id to the child comment. This allows you to have nested grand children
                handleSubmit={(text: string) => addComment(text, replyId, comment.metrics)}

                hasCancelButton
                handleCancel={() => setActiveComment(null)}
                feedbackHubState={feedbackHubState}
                callFeedbackHubAction={callFeedbackHubAction}
                turnOnMarkCommentAsResolution={false}
              />
            )}
          </>
        }
        </div>
          { // whatever prop you add above in the parent component has to also be added down below in the recursive replies component
            // if you don't want a prop to be required down below than just add the optional ? flag via IProp Interface
            replies.length > 0 && turnOffNestedReplies !== true && (
              <div className="replies"> {renderReplies(replies, recursionLevel)} </div>
            )
          }
      </div>

    )
        }
