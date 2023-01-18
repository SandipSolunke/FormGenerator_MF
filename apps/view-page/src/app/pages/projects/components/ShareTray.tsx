import { IconComponent } from '@gessa/component-library';
import { Box, Typography } from '@mui/material';
import themes from 'apps/view-page/src/theme';
import React, { useCallback, useState } from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  ViberShareButton,
  ViberIcon,
  MailruIcon,
} from 'react-share';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from 'react-share';
import { text } from 'stream/consumers';
export interface IShareTray {
  data: any;
  onClose: (data?: any) => void;
}

const ShareTray = (props: IShareTray) => {
  const themeChart = themes.default;

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: themeChart.palette?.background?.bacopWhite,
        color: themes?.default?.palette?.text?.tex600,
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '48px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          width: '100%',

          borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              props && props.onClose && props.onClose();
            }}
          >
            <Typography>Share link with</Typography>
          </div>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              props && props.onClose && props.onClose();
            }}
          >
            <IconComponent
              {...{
                name: 'close_black_24dp',
                color: themes?.default?.palette?.text?.tex600,
                size: 25,
                label: 'Close',
              }}
            ></IconComponent>
          </div>
        </Box>
      </div>
      <div
        style={{
          padding: 10,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 100,
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            padding: 10,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <FacebookShareButton url={props.data}>
            <FacebookIcon size={32} round aria-label="Facebook" />
          </FacebookShareButton>
          <EmailShareButton url={''} body={props.data}>
            <EmailIcon size={32} round aria-label="Mail" />
          </EmailShareButton>
          <WhatsappShareButton url={props.data}>
            <WhatsappIcon size={32} round aria-label="Whatsapp" />
          </WhatsappShareButton>
          <TwitterShareButton url={props.data}>
            <TwitterIcon size={32} round aria-label="Twitter" />
          </TwitterShareButton>
          <LinkedinShareButton url={props.data}>
            <LinkedinIcon size={32} round aria-label="LinkedIn" />
          </LinkedinShareButton>
          <ViberShareButton url={props.data}>
            <ViberIcon size={32} round aria-label="Viber" />
          </ViberShareButton>
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dbe4f0',
              border: 'none',
              padding: '0px',
            }}
            onClick={() => {
              const payload = {
                type: 'localDownload',
                data: props.data,
              };
              props.onClose(payload);
            }}
          >
            <IconComponent
              name="file_download_black_24dp-1-1"
              size={28}
              color={'#2c4b72'}
            ></IconComponent>
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ShareTray;
