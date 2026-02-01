import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
const StyledCalendar = styled.div`
   background-color: #ffffff;
   border-radius: 14px;
   padding: 12px;
   outline: none !important;
   box-shadow:
      0 1px 20px 0 rgba(13, 46, 105, 0.07),
      0 1px 20px 0 rgba(13, 46, 105, 0.07);
   & .react-calendar {
      border: none;
      width: 280px !important;
      & .react-calendar__navigation {
         display: flex;
         margin: 0;
         & button {
            align-items: center;
            background-color: #f6f7f9;
            border-radius: 12px;
            border: none;
            color: #696f85;
            cursor: pointer;
            display: flex;
            font-size: 15px;
            font-weight: 500;
            height: 40px;
            justify-content: center;
            min-width: 40px;
            outline: none;
            padding: 0;
            &:hover,
            &:focus {
               background-color: #3a79f3;
               color: #ffffff;
               cursor: pointer;
            }
            &[disabled] {
               color: #696f85;
               cursor: not-allowed;
               &:hover,
               &:focus {
                  background-color: #f6f7f9;
                  color: #696f85;
               }
            }
         }
         html.dark & button {
            background-color: #222222;
            color: #ffffff;
            &:hover {
               background-color: #3a79f3;
               color: #ffffff;
            }
         }
         & .react-calendar__navigation__next-button {
            margin: 0 0 0 8px;
            & svg {
               margin: 2px 0 0 2px;
            }
         }
         & .react-calendar__navigation__prev-button {
            margin: 0 8px 0 0;
            & svg {
               margin: 2px 2px 0 0;
            }
         }
      }
      & .react-calendar__viewContainer {
         & button {
            align-items: center;
            background-color: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            flex-basis: initial !important;
            font-size: 14px;
            font-weight: 500;
            justify-content: center;
            &[disabled] {
               background-color: transparent !important;
               color: #696f85 !important;
               cursor: not-allowed;
            }
         }
         & .react-calendar__month-view__weekdays__weekday {
            align-items: center;
            color: #696f85;
            cursor: default;
            display: flex;
            flex-basis: initial !important;
            font-size: 14px;
            font-weight: 500;
            height: 40px;
            justify-content: center;
            padding: 0;
            text-transform: lowercase;
            text-transform: capitalize;
            width: 40px;
            & abbr {
               text-decoration: none !important;
               overflow: hidden;
            }
         }
         & .react-calendar__month-view__days__day {
            border-radius: 19px;
            height: 38px;
            justify-content: center;
            margin: 1px;
            width: 38px;
            &:hover {
               color: #ffffff;
               background-color: #3a79f3;
            }
         }
         & .react-calendar__month-view__days__day--neighboringMonth {
            color: #696f85;
         }
         & .react-calendar__month-view__days__day--weekend {
            color: #ff4921;
         }
         & .react-calendar__year-view__months__month,
         & .react-calendar__decade-view__years__year,
         & .react-calendar__century-view__decades__decade {
            border-radius: 8px;
            height: 35px;
            margin: 10px 0;
            padding: 0 !important;
            width: calc(100% / 3);
            &:hover {
               background-color: #3a79f3;
               color: #ffffff;
            }
         }
         & .react-calendar__tile--now {
            &:hover {
               background-color: #3a79f3;
            }
         }
         & .react-calendar__tile--hasActive,
         & .react-calendar__tile--active {
            background-color: #3a79f3;
            color: #ffffff;
            &:hover {
               background-color: #3a79f3;
               color: #ffffff;
            }
         }
      }
   }
`;
const NextIcon = () => (
   <svg width='15' height='15' viewBox='0 0 18 18' fill='none'>
      <path
         d='M6.375 3.75L11.625 9L6.375 14.25'
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
      />
   </svg>
);
const PrevIcon = () => (
   <svg width='14' height='14' viewBox='0 0 18 18' fill='none'>
      <path
         d='M11.625 14.25L6.375 9L11.625 3.75'
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
      />
   </svg>
);
const locales = {
   ru: {
      days: ['Во', 'По', 'Вт', 'Ср', 'Че', 'Пя', 'Су'],
      months: [
         'Январь',
         'Февраль',
         'Март',
         'Апреля',
         'Май',
         'Июнь',
         'Июль',
         'Август',
         'Сентябрь',
         'Октябрь',
         'Ноябрь',
         'Декабрь',
      ],
   },
   uz: {
      days: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
      months: [
         'Yanvar',
         'Fevral',
         'Mart',
         'Aprel',
         'May',
         'Iyun',
         'Iyul',
         'Avgust',
         'Sentyabr',
         'Oktyabr',
         'Noyabr',
         'Dekabr',
      ],
   },
   en: {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December',
      ],
   },
};
const Menu = ({
   calendar,
   context,
   floatingStyles,
   getFloatingProps,
   max,
   min,
   onChange,
   open = false,
   refs,
   setCalendar,
   setOpen,
}) => {
   // const translation = useTranslation();
   // const language = translation?.i18n?.language;
   const language = 'uz';
   const days = useMemo(() => {
      const days = locales?.[language]?.days;
      return days;
   }, [language]);
   const months = useMemo(() => {
      const months = locales?.[language]?.months;
      return months;
   }, [language]);
   return (
      open && (
         <FloatingPortal id='floating-ui-portal'>
            <FloatingFocusManager
               context={context}
               initialFocus={false}
               modal={false}
            >
               <StyledCalendar
                  {...getFloatingProps()}
                  ref={refs.setFloating}
                  style={floatingStyles}
               >
                  <Calendar
                     formatMonth={(_, date) => months[date?.getMonth()]}
                     maxDate={max}
                     minDate={min}
                     next2Label={null}
                     nextLabel={<NextIcon />}
                     prev2Label={null}
                     prevLabel={<PrevIcon />}
                     showNeighboringMonth={false}
                     value={calendar}
                     formatShortWeekday={(_, date) => {
                        const weekDay = days[date?.getDay()];
                        return weekDay;
                     }}
                     navigationLabel={({ view, label, date }) => {
                        const month = months[date?.getMonth()];
                        const newDate = date?.getFullYear();
                        const monthLabel = `${month} ${newDate}`;
                        const isMonth = view === 'month';
                        const newLabel = isMonth ? monthLabel : label;
                        return newLabel;
                     }}
                     onChange={calendar => {
                        const date = String(calendar.getDate() || '').padStart(
                           2,
                           '0',
                        );
                        const month = String(
                           calendar.getMonth() + 1 || '',
                        ).padStart(2, '0');
                        const year = String(
                           calendar.getFullYear() || '',
                        ).padStart(2, '0');
                        const value = `${year}-${month}-${date}`;
                        setCalendar(calendar);
                        setOpen(false);
                        onChange(value);
                     }}
                  />
               </StyledCalendar>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
