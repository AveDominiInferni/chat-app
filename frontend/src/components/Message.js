import { useEffect, useState } from 'react';

export default function Message({ author, content, pic, time}) {
  return (
    <div className="message">
      <div className="message-author">
        <div className="author-pic"></div>
        <div className="author-body">
          <div className="author-username">{author}</div>
          <div className="timestamp">{time}</div>
        </div>
      </div>
      <div className="message-content">{content}</div>
    </div>
  );
}
