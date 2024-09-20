import React from 'react';
import {
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Channel,
  Window,
} from 'stream-chat-react';
import { type Channel as ChannelType } from 'stream-chat';

import Popup from './Popup';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  channel: ChannelType<DefaultStreamChatGenerics>;
}

const ChatPopup = ({ channel, isOpen, onClose }: ChatPopupProps) => {
  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      title={<h2>In-call messages</h2>}
      className="right-4 left-auto -bottom-2.5 h-[calc(100svh-6rem)] animate-none"
    >
      <div className="px-0 pb-3 pt-0 h-[calc(100%-66px)]">
        <Channel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput noFiles />
          </Window>
        </Channel>
      </div>
    </Popup>
  );
};

export default ChatPopup;
