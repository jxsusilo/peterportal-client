import React, { FC, useState, useRef, useEffect } from "react";
import "./AddYearPopup.scss";
import { PlusCircleFill } from "react-bootstrap-icons";
import { Button, Form, Popover, Overlay } from "react-bootstrap";
import { addYear } from '../../store/slices/roadmapSlice';
import { useAppDispatch } from '../../store/hooks';

interface AddYearPopupProps {
  placeholderYear: number;
}

const AddYearPopup: FC<AddYearPopupProps> = ({ placeholderYear }) => {
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(placeholderYear);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => { setYear(placeholderYear) }, [placeholderYear]);

  const handleClick = (event: React.MouseEvent) => {
    setShow(!show);
  };

  return (
    <div>
      <Button variant="light" ref={target} className="add-year-btn" onClick={handleClick}>
        <PlusCircleFill className="add-year-icon" />
        <div className="add-year-text">Add year</div>
      </Button>
      <Overlay show={show} target={target} placement="bottom">
        <Popover id=''>
          <Popover.Content>
            <Form>
              <Form.Group>
                <Form.Label className="add-year-form-label">
                  Start Year
                </Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={year}
                  onChange={(e) => {
                    setYear(parseInt(e.target.value));
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    // prevent submitting form (reloads the page)
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  min={1000}
                  max={9999}
                  placeholder={placeholderYear.toString()}
                ></Form.Control>
              </Form.Group>
              <Button
                className="popup-btn"
                onClick={() => {
                  setShow(!show);
                  dispatch(addYear(
                    {
                      yearData: {
                        startYear: year,
                        quarters: ['fall', 'winter', 'spring'].map(quarter => { return { name: quarter, courses: [] } })
                      }
                    }
                  ));
                  setYear(placeholderYear);
                }}
              >
                Add Year
              </Button>
            </Form>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div >
  );
}

export default AddYearPopup;
