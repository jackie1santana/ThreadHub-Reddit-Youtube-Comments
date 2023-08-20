export interface IComment {
    avatar: string;
    comment: string;
    commenterName: string;
    created: string;
    currentUserId: string;
    draft: boolean;
    draftContent: string;
    id: number;
    initials: string;
    isEdit: boolean;
    likesData: { userLiked: boolean };
    markAsResolved: string;
    parentId: number | null;
    replies: IComment[];
    showComments: boolean;
    showDelete: boolean;
    showEdit: boolean;
    showLikes: true;
    updated: string;
  }
  
  export const mockData = {
    editFeedbackCommentsSection1: {
      assigned: true,
      commentsData: {
        comments: [
          {
            avatar: '/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg',
            comment: 'Test Root Comment1',
            commenterName: 'John Hughes',
            created: '2017-01-01T00:00:00.000Z',
            currentUserId: 'Pat123xyz',
            draft: false,
            draftContent: 'fjhjsgd',
            id: 1,
            initials: 'PC',
            isEdit: false,
            likesData: { userLiked: true },
            markAsResolved: 'true',
            parentId: null,
            replies: [
              {
                avatar: '/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg',
                comment: 'Test Reply Comment 1',
                commenterName: 'James Cameron',
                created: '2017-01-01T00:00:00.000Z',
                currentUserId: 'Pat123xyz',
                draft: false,
                draftContent: 'fjhjsgd',
                id: 2,
                initials: 'PC',
                isEdit: false,
                likesData: { userLiked: true },
                markAsResolved: 'true',
                parentId: 1,
                replies: [
                  {
                    avatar: '/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg',
                    comment: 'Test Reply Comment 1',
                    commenterName: 'Tony Scott',
                    created: '2017-01-01T00:00:00.000Z',
                    currentUserId: 'Pat123xyz',
                    draft: false,
                    draftContent: 'fjhjsgd',
                    id: 3,
                    initials: 'PC',
                    isEdit: false,
                    likesData: { userLiked: true },
                    markAsResolved: 'true',
                    parentId: 2,
                    replies: [],
                    showComments: true,
                    showDelete: true,
                    showEdit: true,
                    showLikes: true,
                    updated: '2017-01-01T00:00:00.000Z',
                  },
                ],
                showComments: true,
                showDelete: true,
                showEdit: true,
                showLikes: true,
                updated: '2017-01-01T00:00:00.000Z',
              },
            ],
            showComments: true,
            showDelete: true,
            showEdit: true,
            showLikes: true,
            updated: '2017-01-01T00:00:00.000Z',
          },
          {
            avatar: '/verizon2/cm3dam/profile/preprod/2019/10/Mrandompic_158.jpg',
            comment: 'Test Root Comment 2',
            commenterName: 'Christopher Nolan',
            created: '2017-01-01T00:00:00.000Z',
            currentUserId: 'Sar123xyz',
            draft: false,
            draftContent: 'fjhjsgd',
            id: 6,
            initials: 'SD',
            isEdit: false,
            likesData: { userLiked: true },
            markAsResolved: 'false',
            parentId: null,
            replies: [],
            showComments: true,
            showDelete: true,
            showEdit: true,
            showLikes: true,
            updated: '2017-01-01T00:00:00.000Z',
          },
        ],
      },
      created: '2017-01-01T00:00:00.000Z',
      department: 'Fios',
      id: 2,
      issueClosed: false,
      issueSubmitted: true,
      isTrendingFireIcon: true,
      latestActivity: '2017-01-01T00:00:00.000',
      resolved: false,
      status: 'Open',
      submitterName: 'Test User',
      submitterUserName: 'Test User',
      title: 'Fios is not working',
      totalComments: 3,
      totalLikes: 12,
      totalRatedStars: 2,
      totalTimesViewed: 2,
      totalUpvotes: 2,
      unassigned: false,
      updated: '2017-01-01T00:00:00.000Z',
    },
  };
  
  // You can now use mockData as the TypeScript object for your comments.
