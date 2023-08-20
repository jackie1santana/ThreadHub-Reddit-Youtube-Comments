/* eslint-disable camelcase */
import React, { FC } from 'react'
import { CommentsList_2ndVersion } from '../ThreadedComments/CommentsList_2ndVersion';


  
export const ThreadedComments_2ndVersion: FC<Readonly<any>> = ({ 
  key,
  title,
  maxCharacterCount,
  currentUserId,
  currentUserAvatar,
  placeHolder = '',
  getCommentApiResponse,
  fullCommentSectionApiData,
  submitLabel,
  feedbackHubState,
  callFeedbackHubAction,
  apiActionType,
  commentFormAtBottom,
  turnOffAddToComment,
  turnOffNestedReplies,
  redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT,
  youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT ,
  // if no limit is set, it will default to 25
	maxRecursionLimit = 10,
  turnOnMarkCommentAsResolution,
  setDefaultTextWhenThereAreNoComments,
 }) => (
        <div key={key}>
          <CommentsList_2ndVersion 
          title={title}
          maxCharacterCount={maxCharacterCount} 
          currentUserId={currentUserId} 
          currentUserAvatar={currentUserAvatar}
          getCommentApiResponse={getCommentApiResponse} 
          fullCommentSectionApiData={fullCommentSectionApiData}
          submitLabel={submitLabel} 
          feedbackHubState={feedbackHubState} 
          callFeedbackHubAction={callFeedbackHubAction}
          apiActionType={apiActionType}
          commentFormAtBottom={commentFormAtBottom}
          placeHolder={placeHolder}
          turnOffAddToComment={turnOffAddToComment}
          turnOffNestedReplies={turnOffNestedReplies}
          redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT={redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT}
          youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT={youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT}
          maxRecursionLimit={maxRecursionLimit}
          turnOnMarkCommentAsResolution={turnOnMarkCommentAsResolution}
          setDefaultTextWhenThereAreNoComments={setDefaultTextWhenThereAreNoComments}
          />
          </div>
  )
