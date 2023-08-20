/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, {
 useState, useEffect, VFC, MouseEvent, Dispatch, SetStateAction, forwardRef, 
} from 'react'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import { ToggleButton, ToggleButtonGroup } from '@mui/material/';

import { isNil } from 'lodash'; 

type PresetToggleType = () => string[];

export interface TextAreaBoxIProps {
  fontBannerBackgroundColor?: React.CSSProperties;
  className?: string;
  textAreaDisplayStyle?: 'reply' | 'edit';
  style?: React.CSSProperties;
  maxCharacterCount: number;
  stringLengthOfText: number;
  placeHolder?: string;
  textAreaTitle?: string;
  // setCommentImageData?:  Dispatch<SetStateAction<string>>;
  textAreaState: {
    text: string;
    fileUpload: File | string | null | undefined;
    fileName: string | null | undefined;
    fileSize: number | null | undefined;
    fileType: string | null | undefined;
    lastModifiedDate: Date | string | null | undefined;
    activeFormats: Array<string> | [];
    // selectedFontFormat: ['bold', 'italic', 'underline'];
  }
  setPassUpTextAreaState: Dispatch<SetStateAction<Record<string, any>>>;
}

export const TextAreaBox: VFC<any> = forwardRef((
  {
    className,
    textAreaDisplayStyle,
    style,
    maxCharacterCount,
    stringLengthOfText,
    textAreaTitle,
    textAreaState,
    setPassUpTextAreaState,
    placeHolder,
  },

  ref: any,
): JSX.Element => {
  //   const { prefilledDescription } = feedbackHubState.editFeedbackPage.topicEditData;

  const [currentTotalCharacters, setCurrentTotalCharacters]: [number, Dispatch<SetStateAction<number>>] = useState(stringLengthOfText || 0);
  const maxCharacters = 1_000;

  const presetToggledFormats: PresetToggleType = () => ['file-upload'];

  const [formats, setFormats]: [string[], Dispatch<SetStateAction<string[]>>] = React.useState(presetToggledFormats);

  const [commentImageData, setCommentImageData]: [ string, Dispatch<SetStateAction<string>> ] = useState('');

  const handleFormat = (event: MouseEvent<HTMLElement>, newFormats: string[]): void => {
    setFormats(newFormats);
  };

  useEffect(() => {
    // pass format data back up only when format is changed or clicked
    setPassUpTextAreaState({
      ...textAreaState,
      activeFormats: formats,
      fileUpload: commentImageData,
    });
  }, [commentImageData, formats]);

  const [textColor, setTextColor] = useState('');

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);

  const handleColorPickerOpen = (event) => {
    setColorPickerOpen(true);
    setColorPickerAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const handleColorSelect = (color) => {
    setTextColor(color);
    handleColorPickerClose();
  };

  const getDescriptionClassName = (): string => {
    switch (true) {
      case (formats.includes('bold') && !formats.includes('italic') && !formats.includes('underlined')):
        return 'desc-textarea bold-text'
      case (formats.includes('italic') && !formats.includes('bold') && !formats.includes('underlined')):
        return 'desc-textarea italic-text'
      case (formats.includes('underlined') && !formats.includes('bold') && !formats.includes('italic')):
        return 'desc-textarea underlined-text'
      case (formats.includes('bold') && formats.includes('italic') && !formats.includes('underlined')):
        return 'desc-textarea bold-text italic-text'
      case (formats.includes('bold') && formats.includes('italic') && formats.includes('underlined')):
        return 'desc-textarea bold-text italic-text underlined-text'
      case (formats.includes('bold') && !formats.includes('italic') && formats.includes('underlined')):
        return 'desc-textarea bold-text underlined-text'
      case (formats.includes('italic') && !formats.includes('bold') && formats.includes('underlined')):
        return 'desc-textarea italic-text underlined-text'

      default: return 'desc-textarea'
    }
  }

  const handleTextArea = (e: any): void => {
    // taking the prefill data & dynamically overwriting w/ the description number via editmode
    setPassUpTextAreaState({
      ...textAreaState,
      text: e.target.value,
    });

    setCurrentTotalCharacters(e.target.value.length);
  }

  const handleFileUpload = (e: { target: { files: FileList; }; }): void => {
    const file: File | any = e.target.files[0];

    const reader: FileReader = new FileReader();

    // if ( file.type === 'image/png' ||  file.type === 'image/jpg' ) { reader.readAsDataURL( file ); } else { reader.readAsText( file ); };
 
    if (
      file.type === 'image/png'
      || file.type === 'image/jpeg'
      || file.type === 'image/jpg'
      || file.type === 'image/svg+xml'
    ) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
      reader.onload = (e: any) => {
        const base64String: string | ArrayBuffer | null = e.target?.result;

        if (typeof base64String === 'string') {
          setPassUpTextAreaState(
            {
              ...textAreaState,
              fileUpload: base64String,
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type,
              lastModifiedDate: file.lastModifiedDate,
            },
          );
        }
      };
    reader.onerror = function () {
      console.error(reader.error);
    };
  }

  return (
    <div
      data-TextAreaTitle={textAreaTitle && `${textAreaTitle}`}
      data-numberOfCharacters={`${currentTotalCharacters}/${!isNil(maxCharacterCount) ? maxCharacterCount : maxCharacters}`}
      className={!isNil(className) ? className : !isNil(textAreaDisplayStyle) ? `text-area-wrapper-${textAreaDisplayStyle}` : 'text-area-wrapper'}
      style={style}
      id="desc-textarea-container"
    >
      { textAreaDisplayStyle === 'reply'
        ? <div className="display-as-input-element">
          <textarea
            ref={ref}
            value={textAreaState?.text}
            maxLength={maxCharacters}
            spellCheck={true}
            onChange={handleTextArea}
            className={getDescriptionClassName()}
            rows={10} cols={50}
            placeholder={placeHolder || 'What would you like to say?'}
          />
          <div id="desc-font-options">

            {/* <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >

              <ToggleButton value="file-upload" aria-label="file-upload" disableRipple={true}>
                <label htmlFor="getFile">
                  <FontIcon iconName="photo" className="uploadIcon" />
                  <input type="file" id="getFile" onChange={handleFileUpload} />
                </label>
              </ToggleButton>

            </ToggleButtonGroup> */}

          </div>
        </div>
        : <>
          {/* <div id="desc-font-options" style={fontBannerBackgroundColor}>
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="bold" aria-label="bold" disableRipple={true}>
                <FormatBoldIcon />
              </ToggleButton>

              <ToggleButton value="italic" aria-label="italic" disableRipple={true}>
                <FormatItalicIcon />
              </ToggleButton>

              <ToggleButton value="underlined" aria-label="underlined" disableRipple={true}>
                <FormatUnderlinedIcon />
              </ToggleButton>
              <div className="image-middle-divider"></div>

              <ToggleButton value="color-picker" aria-label="color-picker" disableRipple={true} disabled={true}>
                <FormatColorTextIcon />
              </ToggleButton>

              <ToggleButton value="unknown" aria-label="unknown" disableRipple={true} disabled={true} >
                <FontDownloadIcon />
                <ArrowDropDownIcon />
              </ToggleButton>

              <div className="image-middle-divider"></div>
              <ToggleButton value="file-upload" aria-label="file-upload" disableRipple={true}>
                <label htmlFor="getFile">
                  <FontIcon iconName="photo" className="uploadIcon" />
                  <input type="file" id="getFile" onChange={handleFileUpload} />
                </label>
              </ToggleButton>

            </ToggleButtonGroup>
          </div> */}
          <div className="textarea-container" contentEditable="true">
      <textarea
        ref={ref}
        value={textAreaState?.text}
        maxLength={maxCharacters}
        spellCheck={true}
        onChange={handleTextArea}
        className={getDescriptionClassName()}
        rows={10}
        cols={50}
        placeholder={placeHolder || 'Write a comment...'}
      />
    </div>
        </>

      }

    </div>
  )
})
