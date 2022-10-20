import { useEffect, useState } from 'react';

export default function Message({author, content}) {
  return (
    <div className="message">
      <div className="message-author">{author}</div>
      <div className="message-content">{content}</div>
    </div>
  );
}