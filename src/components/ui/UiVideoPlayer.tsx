import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

interface Props {
  video: File | string;
}
export default function UiVideoPlayer({ video }: Props) {
  const [videoUrl, setVideoUrl] = useState<string>();
  useEffect(() => {
    if (typeof video === 'string') {
      // If the video is already a string (URL or path), use it directly
      setVideoUrl(video);
    } else {
      // If the video is a File object, create a temporary URL
      setVideoUrl(URL.createObjectURL(video));
    }
  }, [video]);

  return (
    <VideoPlayer>
      <ReactPlayer url={videoUrl} controls />
    </VideoPlayer>
  );
}

const VideoPlayer = styled.div`
  display: flex;
  justify-content: center;
  video {
    border-radius: ${pxToRem(9)};
    background: rgba(21, 19, 27, 0.5);
    width: 100%;
  }
`;
