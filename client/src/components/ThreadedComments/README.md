## Modifying This File

Thank you for considering contributing to the Threaded Comments 2nd Version component. It's important to note that this component is used in many different components throughout the project, so it's crucial to maintain its stability.

We ask that you do not make any changes to this file unless they are **absolutely necessary** and you are confident in your understanding of the changes you are making. **_If you do need to make modifications_**, please ensure that you **comment out existing code rather than overwriting it.** This will allow us to trace any potential breaking changes. This is a very complex comment thread, and we want to ensure that any changes made to it are done with the utmost care and consideration.

_This is the second version of the threaded comments component. The original threaded comments component has been altered for specific use cases, and as a result, we have created this second version to provide a more general-purpose implementation._

- The threaded comments feature, version 2, is currently functional and available for use. However, it should be noted that some CSS styles and additional features such as likes, upvotes, and ratings are still in development. These features will be added in the near future.
# Comments Thread

Our comments thread is organized into a tree structure, with each comment potentially having multiple replies. This allows for a hierarchical arrangement of comments, with root comments at the top level and replies nested underneath.

## Comment Structure

Each comment in our thread has the following fields:

- `id`: a unique identifier for the comment
- `parentId`: the `id` of the parent comment (if any). Root comments, which do not have a parent, have a `parentId` of `null`.
- `commenterName`: the name of the commenter
- `initials`: the initials of the commenter
- `avatar`: the avatar of the commenter
- `comment`: the text of the comment
- `created`: the timestamp for when the comment was created
- `draft`: a boolean indicating whether the comment is a draft
- `draftContent`: the draft version of the comment (if any)
- `isEdit`: a boolean indicating whether the comment is being edited
- `likesData`: an object containing data about likes for the comment
- `showComments`: a boolean indicating whether comments are shown for the comment
- `showDelete`: a boolean indicating whether the delete button is shown for the comment
- `showEdit`: a boolean indicating whether the edit button is shown for the comment
- `showLikes`: a boolean indicating whether the likes button is shown for the comment
- `updated`: the timestamp for when the comment was last updated
- `replies`: an array of replies to the comment (if any)

### repliedToString Property
The code const repliedToString: string = ${index === 0 ? comment.commenterName : replies[ index - 1 ].commenterName}` is not reliable for YouTube comments because it assumes that the replies are in a specific order, and it only counts the last index of the replies. However, in a real-world scenario, such as YouTube comments, the replies can be in any order and can be nested at various levels. Therefore, using the last index of the replies to determine who the comment is being replied to is not accurate.

In YouTube comments, a common way to indicate who a comment is being replied to is to use @mentions. This means that when a user wants to reply to a specific comment, they type "@" followed by the username of the person they are replying to. This approach is more reliable as it does not rely on the order of the replies or the level of nesting. Instead, it explicitly states who the comment is being replied to, regardless of where the comment is located in the thread.

For example, if a user wants to reply to a comment made by "JohnDoe" on a YouTube video, they would type "@JohnDoe" in the comment box, and it would notify JohnDoe that someone replied to their comment, and also the other users will know that the comment is in relation to JohnDoe's comment.

repliedToString only works for reading style comments
## You can have 3 different data structures for comments (nested, flat, and flat with grand children)
(data structure example shown below)
### Flat array of comments with children only (no recursive grand children) / youtube and instagram style comments prop
- A parent id of null is root. If one root comment had 5 children then all 5 children would have a parentId that matches to the root comment id.
- If a root comment had id of 2 then you would find all children with parentId of 2.
- These comments generally do not produce grand children. But only one set of children. To produce grandchildren you would need to use the nested array of objects for comments/ reddit style comments OR you could use the flat array of comments / youtube and instagram style comments, but the child replies have a parent id that matches to a comment id. So each parent Id will be unique.
But it would be a flat array in not nested

### Flat array of comments with grand children (Not Nested) / Reddit style comments prop
- To produce grandchildren you would need to use the nested array of objects for comments/ reddit style comments OR you could use a flat array and child replies have a parent id that matches to the comment id. So each parent Id will be unique.
But it would be a flat array in NOT  be nested. Essentially if you were to flatten any nested array of objects it and return would produce this type of structure.


### Nested array of objects for comments with grand children (Nested) / reddit style comments prop
- A parentId of null is root. Child replies have a parent id that matches to the (PARENT comment) id. So each parent Id will be unique.
- For example if maria had a comments id of 3 than its child sam would have a parentId of 3. Then sam would have a comments id of 4 & and is child janet would have a parent id of 4 and so on like a russian doll of nested objects  one inside of another .
- If you are using nested comments data structure you will need to flatten the nested array of objects for comments.
- Subsequent to the flattening your data structure should look like `Flat array of comments with grand children (Not Nested) / Reddit style comments prop` data structure below


## Rendering the Comments Thread

To render the comments thread, we start by extracting the root comments (those with a `parentId` of `null`). We then iterate over the root comments and render each one using a recursive function that takes a comment and its associated replies as input and outputs the rendered HTML for that comment and its replies. This function is called for each comment in the root comments array, passing in the comment and its replies as arguments.

The function starts by rendering the comment itself, including the commenter's name, avatar, and comment text. It then checks if the comment has any replies, and if so, it renders each reply by calling the function recursively for each reply, passing in the reply and its replies as arguments. This allows for multiple levels of nesting in the comments thread.


- order to use threaded comments, it is important to structure the data as follows: the comments data should be organized within multiple comment threads. The following is an example of how the data should be structured: `C:\Users\max solenov\development\biw_dev\verizon-mystage2\fed-src\mock\json\route\feedbackHub\get-feedbackhub-search.json` inside of `multipleCommentThreads` object {}.


### Flat array of comments with children only (no recursive grand children) / youtube and instagram style comments prop
  The comments data should be structured as follows:
 
```json
"<randomName>CommentSection<1 sequential number>": {
                        "department": "Fios",
                        "id": 1,
                        "title": "Fios cancellation email template",
                        "created": "2017-01-01T00:00:00.000Z",
                        "issueClosed": false,
                        "issueSubmitted": true,
                        "isTrendingFireIcon": true,
                        "latestActivity": "2017-01-01T00:00:00.000",
                        "status": "Open",
                        "submitterName": "Test User",
                        "submitterUserName": "Test User",
                        "updated": "2017-01-01T00:00:00.000Z",
                        "totalComments": 3,
                        "totalLikes": 12,
                        "totalRatedStars": 2,
                        "totalTimesViewed": 2,
                        "totalUpvotes": 2,
                        "assigned": true,
                        "unassigned": false,
                        "resolved": false,
                        "commentsData": {
                            "comments": [
                                {
                                    "id": 1,
                                    "currentUserId": "Pat123xyz",
                                    "parentId": null,
                                    "commenterName": "Patrick Connolly",
                                    "initials": "PC",
                                    "avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
                                    "comment": "Test Comment",
                                    "created": "2017-01-01T00:00:00.000Z",
                                    "draft": false,
                                    "draftContent": "fjhjsgd",
                                    "isEdit": false,
                                    "likesData": {
                                        "userLiked": true
                                    },
                                    "showComments": true,
                                    "showDelete": true,
                                    "showEdit": true,
                                    "showLikes": true,
                                    "updated": "2017-01-01T00:00:00.000Z"
                                }
```
                                
                               
- You can import this data structure into the component and use it to render the threaded comments via down below.
### Nested array of objects for comments with grand children (Nested) / reddit style comments prop
```json
"editFeedbackCommentsSection1": {
			"assigned": true,
			"commentsData": {
				"comments": [{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "Test Root Comment1",
						"commenterName": "Patrick Connolly",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Pat123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 1,
						"initials": "PC",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "true",
						"parentId": null,
						"replies": [{
								"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
								"comment": "Test Reply Comment 1",
								"commenterName": "Patrick Connolly",
								"created": "2017-01-01T00:00:00.000Z",
								"currentUserId": "Pat123xyz",
								"draft": false,
								"draftContent": "fjhjsgd",
								"id": 2,
								"initials": "PC",
								"isEdit": false,
								"likesData": {
									"userLiked": true
								},
								"markAsResolved": "true",
								"parentId": 1,
								"replies": [{
									"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
									"comment": "Test Reply Comment 1",
									"commenterName": "Patrick Connolly",
									"created": "2017-01-01T00:00:00.000Z",
									"currentUserId": "Pat123xyz",
									"draft": false,
									"draftContent": "fjhjsgd",
									"id": 3,
									"initials": "PC",
									"isEdit": false,
									"likesData": {
										"userLiked": true
									},
									"markAsResolved": "true",
									"parentId": 2,
									"replies": [],
									"showComments": true,
									"showDelete": true,
									"showEdit": true,
									"showLikes": true,
									"updated": "2017-01-01T00:00:00.000Z"
								}],
								"showComments": true,
								"showDelete": true,
								"showEdit": true,
								"showLikes": true,
								"updated": "2017-01-01T00:00:00.000Z"
							}
						],
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					},
					{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "Test Root Comment 2",
						"commenterName": "Sarah Dawson",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Sar123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 6,
						"initials": "SD",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "false",
						"parentId": null,
						"replies": [],
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					}
				]
			},
			"created": "2017-01-01T00:00:00.000Z",
			"department": "Fios",
			"id": 2,
			"issueClosed": false,
			"issueSubmitted": true,
			"isTrendingFireIcon": true,
			"latestActivity": "2017-01-01T00:00:00.000",
			"resolved": false,
			"status": "Open",
			"submitterName": "Test User",
			"submitterUserName": "Test User",
			"title": "Fios is not working",
			"totalComments": 3,
			"totalLikes": 12,
			"totalRatedStars": 2,
			"totalTimesViewed": 2,
			"totalUpvotes": 2,
			"unassigned": false,
			"updated": "2017-01-01T00:00:00.000Z"
		}
	}
}
```

### Flat array of comments with grand children (Not Nested) / Reddit style comments prop
```json
"comments": [{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "Test Root Comment1",
						"commenterName": "Pat Connolly",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Pat123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 1,
						"initials": "PC",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "true",
						"parentId": null,
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					},
					{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "Test Root Comment 2",
						"commenterName": "Sarah Dawson",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Sar123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 2,
						"initials": "SD",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "false",
						"parentId": null,
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					},
					{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "1st Child of Root comment 2",
						"commenterName": "Maria Rodrigues",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Mar123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 3,
						"initials": "MR",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "false",
						"parentId": 2,
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					},
					{
						"avatar": "/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg",
						"comment": "reply to replyyyy",
						"commenterName": "Maria Rodrigues",
						"created": "2017-01-01T00:00:00.000Z",
						"currentUserId": "Mar123xyz",
						"draft": false,
						"draftContent": "fjhjsgd",
						"id": 4,
						"initials": "MR",
						"isEdit": false,
						"likesData": {
							"userLiked": true
						},
						"markAsResolved": "false",
						"parentId": 3,
						"showComments": true,
						"showDelete": true,
						"showEdit": true,
						"showLikes": true,
						"updated": "2017-01-01T00:00:00.000Z"
					}
				]
			},
			"created": "2017-01-01T00:00:00.000Z",
			"department": "Fios",
			"id": 2,
			"issueClosed": false,
			"issueSubmitted": true,
			"isTrendingFireIcon": true,
			"latestActivity": "2017-01-01T00:00:00.000",
			"resolved": false,
			"status": "Open",
			"submitterName": "Test User",
			"submitterUserName": "Test User",
			"title": "Fios is not working",
			"totalComments": 3,
			"totalLikes": 12,
			"totalRatedStars": 2,
			"totalTimesViewed": 2,
			"totalUpvotes": 2,
			"unassigned": false,
			"updated": "2017-01-01T00:00:00.000Z"
		}
	}
}
```
   
```tsx

        import { ThreadedComments } from '../../../shared-components/ThreadedComments/ThreadedComments';

        import { ActionType, CommentInstance, CommentThreadInstance, useFeedbackHubContext } from '../../../ContextApi/feedbackHubContext';


        import { ICurrentUserInfo } from '../Components/MyAssignmentsPage/EditFeedbackPage/interface';
        const { feedbackHubState, callFeedbackHubAction } = useFeedbackHubContext();


        const commentThreadData: Array<CommentInstance> | null = size(feedbackHubState.feedBackSearch.feedbackItems) > 0
		?
		feedbackHubState.feedBackSearch.feedbackItems[0].multipleCommentsThreads.editFeedbackCommentsSection1.commentsData.comments
		:
		null;

	    const fullCommentSectionApiData: CommentThreadInstance | null = size(feedbackHubState.feedBackSearch.feedbackItems) > 0
		?
		feedbackHubState.feedBackSearch.feedbackItems[0].multipleCommentsThreads.editFeedbackCommentsSection1
		:
		null;
        
        const currentUserInfo: ICurrentUserInfo = feedbackHubState.feedBackSearch.currentLoggedInUser;
```


- CommentThreadInstance is the data structure for the threaded comments.
- After 5 minutes has passed the user will not be able to add it or delete their comment
- example of how to use props to render the threaded comments.

```tsx
interface IProps{
  title?: string;
  maxCharacterCount: number;
  currentUserId: number | string;
  currentUserAvatar?: string
  getCommentApiResponse: Array<CommentInstance>;
  fullCommentSectionApiData: CommentThreadInstance; 
  submitLabel?: string;
  placeHolder?: string;
  apiActionType: IActionType;
  commentFormAtBottom?: boolean;
  turnOffNestedReplies?: boolean; 
  turnOnMarkCommentAsResolution?: boolean;
  // onSubmit: (comment: string) => void;
  // onCancel: () => void;
}

                    <ThreadedComments
					 title="Add a comment" 
					 maxCharacterCount={500}
                     
                     // This flag allows the user to be able to added or delete their own comment in not others
					 currentUserId={currentUserInfo.id}
					 currentUserAvatar={currentUserInfo.avatar}

                        // This is the data structure for the comments array only 
                        //| The type definition for this is Array<CommentInstance>; above from '../../../ContextApi/feedbackHubContext';
                        // or feel free to pop in your own data structure
					 getCommentApiResponse={commentThreadData} 

                        // This is the data structure for the parent object of the comments array 
                        //| The type definition for this is CommentThreadInstance above from '../../../ContextApi/feedbackHubContext';
                        // or feel free to pop in your own data structure
					 fullCommentSectionApiData={fullCommentSectionApiData}
					 submitLabel="Add this comment" 
					 feedbackHubState={feedbackHubState} 
					 callFeedbackHubAction={callFeedbackHubAction}
                     // or feel free to pop in your own action type
					 apiActionType="GET_FEEDBACK_HUB_SEARCH_DATA"

                     // This flag allows you to position the comment form from top or to bottom
					 commentFormAtBottom={true}
                     
					 turnOnMarkCommentAsResolution={true}
					// Set this to true if you have a flat array of objects data structure only ( no nested array of objects data structure WILL NOT WORK IF YOU 						//HAVE A NESTED ARRAY OF OBJECTS DATA STRUCTURE) AND YOU WANT THE COMMENTS TO APPEAR ONE LEVEL DEEP
                    youtubeCommentStyleEnabled_ONLY_4_FLAT_DATA_STRUCT={false} (default set to true)
					
					// Set this to true if you have nested array of objects data structure (by flattening the array) OR even if you have a flat Array of objects 						//data structure, it will still appear as a reddit comment style 
					redditCommentStyleEnabled_ONLY_4_FLAT_OR_NESTED_DATA_STRUCT={true} (default set to false)
					
					// This is an option that allows you to set the max recursion limit for both comment styles
					maxRecursionLimit={4} (default set to 5 and cannot add more than 50) 
                     // This is an option that allows you to turn on nested replies
					turnOffNestedReplies={true} 
                    //  user to not be able to add to the comment
                    turnOffAddToComment={true}
                    setDefaultTextWhenThereAreNoComments={`
					 This idea has been assigned for review. Our review process can take days, 
					 weeks or even months depending on the complexity of the idea and ease of implementation.
					  You will be notified when any one comments on this idea and when the status is updated by a moderator.
					 `}
					 />
```

- example of how to make a post fetch call to the API to update a comment to the threaded comments.

```tsx
    callFeedbackHubAction(apiActionType, {
      updateAndSaveData: {
        commentId: null,
        text: comment,
      }
    });
```

When setting up the `feedbackHubContext.tsx` file, the route/action type for the feeds should be `FEEDS.ROUTE.FEEDBACK_HUB.GET_FEEDBACK_HUB_SEARCH_DATA` or a feed route corresponding to the JSON data structure you choose to use.

It is also necessary to create an object reflecting the JSON file you choose, as well as a type or interface for it.

To avoid causing the page to reload, do not set a loading status. Instead, set up your context fetch call as follows:

```tsx 
GET_EDIT_FEEDBACK_COMMENTS: (
            payload: {},
            priorState: FeedBackHubState,
            errorHandler: (Error) => void
        ) => {
            contextFetchUtil<ActionType, FeedBackHubSearchData>(
                FEEDS.ROUTE.FEEDBACK_HUB.GET_FEEDBACK_HUB_SEARCH_DATA,
                payload,
                callFeedbackHubAction,
                'GET_FEEDBACK_HUB_SEARCH_DATA_RESPONSE'
            ).catch(error => {
                errorHandler(error);
            });

            return {
                ...priorState,
            };
        },
        GET_EDIT_FEEDBACK_COMMENTS_RESPONSE: (
            payload: FeedBackHubSearchData,
            priorState: FeedBackHubState,
            errorHandler: (Error) => void
        ) => {
            return {
                ...priorState,
                feedBackSearch: payload,
	            };
        },
```

To ensure proper functionality of the comment list, it is important to set up the correct data structure and pass the appropriate props. You can verify the accuracy of the comments and mark resolution data by checking the network request tab and dev tools to see if the data is being correctly sent via the submit button.

You can preview the threaded comments at `https://localhost/verizon2/nkl-api/feedBackHub/myassignments/editfeedback` and view its structure in `fed-src\app-src\routes\feedbackHub\Components\MyAssignmentsPage\EditFeedbackPage\EditFeedback.tsx`.