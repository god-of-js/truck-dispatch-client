import React, { useState } from 'react';
import styled from 'styled-components';

// this is how the option data will be displayed 

// const options = [
//   { value: "option1", label: "Option 1" },
//   { value: "option2", label: "Option 2" },
//   { value: "option3", label: "Option3" },
//   { value: "option4", label: "Option 4" },
//   { value: "option5", label: "Option 5" }
// ]

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
}

export const UiSelect: React.FC<Props> = ({ options }: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleOptions = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setOpen(false);
  };


  return (
    <div>
      <StyledSelect onClick={toggleOptions}>
        <span>{selectedOption.label}</span>
        <StyledOptions open={open}>
          {options.map((option) => (
            <StyledOption
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </StyledOption>
          ))}
        </StyledOptions>
      </StyledSelect>
    </div>
  );
};

const StyledSelect = styled.div`
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledOptions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1;
  overflow: auto;
  max-height: 150px;
  display: ${({ open }: { open: boolean }) => (open ? "block" : "none")};
`;

const StyledOption = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

