import React, { useState, useEffect, useRef } from 'react';

import EllipsisButton from './EllipsisButton';

interface TaskItemProps {
  title: string;
  isChecked: boolean;
  maxlength?: number;
}

const TaskItem:React.FC<TaskItemProps>= ({ title, isChecked, maxlength=45 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [tempTitleValue, setTempTitleValue] = useState(title);

  const handleEdit = () => {
    setTempTitleValue(titleValue);
    setIsEditing(true)
  }

  const handleSave = () => {
    setTitleValue(tempTitleValue);
    setIsEditing(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef?.current.contains(event.target)) {
        // put modal to warn here
        setIsEditing(false);
      } 
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef])

  return(
    <div className="task-item" ref={containerRef}>
      <div className="task-item-checkbox">    
        <label style={{ display: 'grid', gridTemplateColumns: 'auto 1fr'}}>
          <input type="checkbox" />
          <input 
            className="task-item-title" 
            type="text" 
            value={isEditing ? tempTitleValue : (titleValue.length < maxlength ? titleValue : `${titleValue.slice(0, maxlength)}...`)}
            readOnly={!isEditing}
            onChange={(event: any)=>{ setTempTitleValue(event.target.value) }}
          />
        </label>
      </div>  

      {isEditing? (
        <button className="task-item-save-button" onClick={handleSave}>
          Save
        </button>
      ) : (
        <EllipsisButton onEdit={handleEdit}/>
      )}
    </div>
  );
};

export default TaskItem;