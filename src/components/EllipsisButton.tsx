import React, { useState, useEffect, useRef } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

interface EllipsisButtonProps {
  onEdit: () => void;
  onDelete: Function;
}

const EllipsisButton: React.FC<EllipsisButtonProps> = ({ onEdit, onDelete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleEllipsisClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDelete = async() => {
    onDelete();
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef?.current.contains(event.target)) {
        setDropdownVisible(false);
      } 
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef])

  return(
    <div style={{ position: 'relative' }} ref={containerRef}>
      <button className="ellipsisButton" onClick={handleEllipsisClick}>
        <EllipsisOutlined />
      </button>
      <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <div className="dropdownItem" onClick={onEdit}>
          Edit
        </div>
        <div className="dropdownItem" onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default EllipsisButton;