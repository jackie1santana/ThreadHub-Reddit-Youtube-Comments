/* eslint-disable import/order */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, {
 useState, Dispatch, SetStateAction, VFC, 
} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { TextAreaBox } from '../ReusableComponents/TextAreaBox/TextAreaBox';
import './Comment_2ndVersion.scss'
import { Button } from '@mui/material';

interface IProps {
    getCommentApiResponse?: Array<any>;
    fullCommentSectionApiData?: any;
    maxCharacterCount: number;
    checked?: boolean;
    setChecked?: Dispatch<SetStateAction<boolean>>;
    placeHolder?: string;
    submitLabel?: string;
    // textAreaState: {
    //   text: string;
    //   fileUpload: File | null | undefined;
    //   fileName: string | null | undefined;
    //   fileSize: number | null | undefined;
    //   fileType: string | null | undefined;
    //   lastModifiedDate: Date | string | null | undefined;
    //   activeFormats: Array<string> | [];
    // }
    // setPassUpTextAreaState: Dispatch<SetStateAction<any>>;
    handleSubmit?: (text: string, parentId: number | null) => void;
    // onSubmit: (comment: string) => void;
    // onCancel: () => void;
    hasCancelButton?: boolean;
    initialText?: string;
    handleCancel?: any;
    turnOnMarkCommentAsResolution?: boolean;
}

interface ITextArea{
    text: string;
    fileUpload: File | null | undefined;
    fileName: string | null | undefined;
    fileSize: number | null | undefined;
    fileType: string | null | undefined;
    lastModifiedDate: Date | string | null | undefined;
    activeFormats: Array<string> | [];
    // selectedFontFormat: ['bold', 'italic', 'underline'];
}
/*  
* setPassUpTextAreaState via CommentForm are being passed up 
*  to this component form up then passed up to this reusable component via /ThreadedComments/ThreadedComments.tsx
* maxCharacterCount, textAreaState  are being passed down
*/

export const CommentForm_2ndVersion:VFC<any> = ({ 
  fullCommentSectionApiData,
  maxCharacterCount, 
  checked,
  setChecked,  
  placeHolder, 
  handleSubmit, 
  submitLabel, 
  feedbackHubState,
	callFeedbackHubAction, 
  hasCancelButton = false, 
  initialText = '', 
  turnOnMarkCommentAsResolution = false,
  handleCancel, 
}): JSX.Element => {
  const initialState: ITextArea = {
    text: initialText,
    fileUpload: null,
    fileName: null,
    fileSize: null,
    fileType: null,
    lastModifiedDate: null,
    activeFormats: [],
    }
  const [textAreaState, setPassUpTextAreaState] = useState(initialState);

  const isTextAreaDisabled: boolean = textAreaState.text.length === 0;

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // This is the root level comment being added, it will be given a parentId null.
    // A parentId of null distinguishes the difference between a root comment and a child
    handleSubmit(textAreaState.text, null);

    // reset form after the submit
    setPassUpTextAreaState({
      ...textAreaState,
      text: '',
    });
  }

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      
        <TextAreaBox 
        maxCharacterCount={maxCharacterCount} 
        stringLengthOfText={textAreaState.text.length} 
        textAreaState={textAreaState} 
        setPassUpTextAreaState={setPassUpTextAreaState} 
        placeHolder={placeHolder}
        feedbackHubState={feedbackHubState} 
        callFeedbackHubAction={callFeedbackHubAction}
        />
        
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div>
            <Button 
    
           type="button"
           style={{ 
             backgroundColor: 'black', 
             color: 'white',
             marginTop: '1rem',
             width: '21rem',
             borderRadius: '1rem',
           }} 
           disabled={isTextAreaDisabled} 
    
           onClick={onSubmit}
            >
              Add a comment
            </Button>
          </div>

        {
            turnOnMarkCommentAsResolution === true
            && <div style={{ display: 'flex' }}>
              <div>
                <Checkbox
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                defaultChecked={checked}
                checked={checked}
                onChange={handleChecked}
                inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            
              <div style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>Mark comment as resolution</div>
          </div>

          }

        { 
              hasCancelButton && (
                <div>
                  <Button 
                  
                  type="button"
                  style={{ 
                    backgroundColor: 'black', 
                    color: 'white',
                    marginTop: '1rem',
                    width: '21rem',
                  }} 
                  
                  onClick={handleCancel}
                  >Cancel
                  </Button>
                </div>
              )
            }   
           </div>
       
    </div>
  )
}
