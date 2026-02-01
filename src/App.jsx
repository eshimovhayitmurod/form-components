import { Fragment, useState } from 'react';
import styled from 'styled-components';
import SelectComponent from './Select';
import Calendar from './components/Calendar/Calendar';
import ColorInput from './components/ColorInput';
import DateInput from './components/DateInput';
import Label from './components/Label';
import MaskInput from './components/MaskInput';
import NumberInput from './components/NumberInput';
import OTPInput from './components/OTPInput';
import PasswordInput from './components/PasswordInput';
import PhoneInput from './components/PhoneInput';
import {
   RCSlider,
   ReactInputRange,
   ReactRange,
   ReactSlider,
} from './components/RangeInput';
import SliderInput from './components/SliderInput';
import StarsInput from './components/StarsInput';
import SwitchInput from './components/SwitchInput';
import TextInput from './components/TextInput';
import Textarea from './components/Textarea';
import TimeInput from './components/TimeInput';
const StyledHeader = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   & h1 {
      font-size: 32px;
      font-weight: 600;
      margin: 32px 0 0 0;
      text-align: center;
   }
   & p {
      font-size: 18px;
      font-weight: 500;
      margin: 24px 0 0 0;
      text-align: center;
      color: #768695;
      & a {
         align-items: center;
         background-color: #5254f1;
         border-radius: 10px;
         color: white;
         display: flex;
         font-size: 16px;
         justify-content: center;
         padding: 12px 24px;
         text-decoration: none;
      }
   }
`;
const StyledInputContent = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   & .sub-title {
      font-size: 24px;
      font-weight: 600;
      margin: 24px 0 8px 0;
      width: 300px;
   }
   & .content {
      padding: 8px 0;
      width: 300px;
   }
`;
// const StyledEditorContent = styled.div`
//    align-items: center;
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    width: 100%;
//    & .sub-title {
//       font-size: 24px;
//       font-weight: 600;
//       margin: 24px 0 8px 0;
//       width: 700px;
//    }
//    & .content {
//       padding: 8px 0 24px 0;
//       width: 700px;
//    }
// `;
const App = () => {
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [text, setText] = useState('');
   const [number, setNumber] = useState('');
   const [comment, setComment] = useState('');
   const [OTP, setOTP] = useState('');
   // const [info, setInfo] = useState('');
   const [time, setTime] = useState('');
   const [date, setDate] = useState('');
   const [rating, setRating] = useState(0);
   const [checked, setChecked] = useState(false);
   const [range, setRange] = useState([20, 40, 60, 80]);
   const [val, setVal] = useState([30, 80]);
   const [currency, setCurrency] = useState('');
   const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 0 });
   const [input, setInput] = useState(null);
   const [mask, setMask] = useState('');
   const options = [
      {
         label: 'Option 1',
         value: 1,
      },
      {
         label: 'Option 2',
         value: 2,
      },
      {
         label: 'Option 3',
         value: 3,
      },
      {
         label: 'Option 4',
         value: 4,
      },
      {
         label: 'Option 5',
         value: 5,
      },
      {
         label: 'Option 6',
         value: 6,
      },
      {
         label: 'Option 7',
         value: 7,
      },
      {
         label: 'Option 8',
         value: 8,
      },
   ];
   return (
      <Fragment>
         <StyledHeader>
            <h1>Form components</h1>
            <p>Form components for react application</p>
            <p>
               <a
                  href='https://github.com/hayitmurod707/form-components'
                  rel='noreferrer'
                  target='_blank'
               >
                  Github repository
               </a>
            </p>
         </StyledHeader>
         <StyledInputContent>
            <h2 className='sub-title'>Inputs</h2>
            <div className='content'>
               <Label>Text input</Label>
               <TextInput onChange={setText} value={text} />
            </div>
            <div className='content'>
               <Label>Number input</Label>
               <NumberInput onChange={setNumber} value={number} />
            </div>
            <div className='content'>
               <Label>
                  Mask input (tin, pinfl, card, card expire, passport, account,
                  mfo)
               </Label>
               <MaskInput onChange={setMask} value={mask} />
            </div>
            <div className='content'>
               <Label>Time input</Label>
               <TimeInput onChange={setTime} value={time} />
            </div>
            <div className='content'>
               <Label>Phone input</Label>
               <PhoneInput onChange={setPhone} value={phone} />
            </div>
            <div className='content'>
               <Label>Password input</Label>
               <PasswordInput onChange={setPassword} value={password} />
            </div>
            <div className='content'>
               <Label>Date input</Label>
               <DateInput onChange={setDate} value={date} />
            </div>
            <div className='content'>
               <Label>Color input</Label>
               <ColorInput value={color} format='rgba' onChange={setColor} />
            </div>
            <div className='content'>
               <Label>Select input</Label>
               <SelectComponent
                  isSearchable={false}
                  onChange={setInput}
                  options={options}
                  type='autocomplete'
                  value={input}
                  getUrl={({ search, page }) => {
                     const url = `/handbook/nomenclature/?${
                        page ? '&page=' + page : ''
                     }${search ? '&search=' + search : ''}`;
                     return url;
                  }}
               />
            </div>
            <div className='content'>
               <Label>Slider input</Label>
               <SliderInput
                  max={100}
                  min={0}
                  onChange={setCurrency}
                  value={currency}
               />
            </div>
            <div className='content'>
               <Label>Otp input</Label>
               <OTPInput autoFocus={false} onChange={setOTP} value={OTP} />
            </div>
            <div className='content'>
               <Label>Stars input</Label>
               <StarsInput value={rating} onChange={setRating} />
            </div>
            <div className='content'>
               <Label>Textarea</Label>
               <Textarea onChange={setComment} value={comment} />
            </div>
            <div className='content'>
               <Label>Switch input</Label>
               <SwitchInput onChange={setChecked} checked={checked} />
            </div>
            <div className='content'>
               <Label>ReactSlider</Label>
               <ReactSlider onChange={setRange} value={range} />
            </div>
            <div className='content'>
               <Label>ReactRange</Label>
               <ReactRange onChange={setRange} value={range} />
            </div>
            <div className='content'>
               <Label>RCSlider</Label>
               <RCSlider onChange={setRange} value={range} />
            </div>
            <div className='content'>
               <Label>ReactInputRange</Label>
               <ReactInputRange onChange={setVal} value={val} />
            </div>
         </StyledInputContent>
         <Calendar />
      </Fragment>
   );
};
export default App;
