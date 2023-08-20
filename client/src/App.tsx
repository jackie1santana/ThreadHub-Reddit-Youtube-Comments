/* eslint-disable camelcase */
import React, { useState } from 'react';
import { ThreadedComments_2ndVersion } from './components/ReusableComponents/ThreadedComments_2ndVersion';
import { IComment, mockData as commentThreadData } from './components/MockData/CommentData';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const App = () => {
  const [commentStyle, setCommentStyle] = useState('youtube');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStyle: string,
  ) => {
    setCommentStyle(newStyle);
  };

  return (
    <div style={{ fontFamily: 'Arial'}}>
      {/* <ToggleButtonGroup
        color="primary"
        value={commentStyle}
        exclusive
        onChange={handleChange}
        aria-label="Comment Style"
        style={{ marginBottom: '20px' }} // Inline styling for spacing
      >
        <ToggleButton value="youtube">YouTube Comments</ToggleButton>
        <ToggleButton value="reddit">Reddit Comment Thread</ToggleButton>
      </ToggleButtonGroup> */}

      <div style={{ border: '1px solid #ccc', borderRadius: '5px',  }}> 
   
        <ThreadedComments_2ndVersion
          key="comments"
          title="Reddit Style Comments Thread"
          maxCharacterCount={500}
          currentUserId={1}
          currentUserAvatar={null}
          getCommentApiResponse={commentThreadData?.editFeedbackCommentsSection1?.commentsData?.comments}
          fullCommentSectionApiData={commentThreadData}
          submitLabel="Add this comment"
          apiActionType="GET_FEEDBACK_HUB_SEARCH_DATA"
          commentFormAtBottom={true}
          turnOnMarkCommentAsResolution={false}
          youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT={false}
          redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT={true}
          maxRecursionLimit={4}
          turnOffNestedReplies={false}
          turnOffAddToComment={false}
          setDefaultTextWhenThereAreNoComments={`
            This idea has been assigned for review. Our review process can take days, 
            weeks or even months depending on the complexity of the idea and ease of implementation.
            You will be notified when any one comments on this idea and when the status is updated by a moderator.
          `}
        />
      </div>
    </div>
  );
};

export default App;
