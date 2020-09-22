import React from 'react';

export const Items = [
  {
    hidden: false,
    icon: (
      <span className="tw-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9999 11L12 2L0.894714 11L2.11935 12.5512L12 4.51802L21.7753 12.5512L22.9999 11Z"
            fill="#37517e"
          />
          <path
            d="M5.99999 14.0001V20.0001H18V14.0001H20V22.0001H3.99999V14.0001H5.99999Z"
            fill="#37517e"
          />
        </svg>
      </span>
    ),
    label: 'Home',
    path: '#home',
  },
  {
    hidden: false,
    icon: (
      <span className="tw-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 16H4V14H16V16Z" fill="#37517e" />
          <path
            d="M5.5 9C4.67157 9 4 9.67157 4 10.5C4 11.3284 4.67157 12 5.5 12H6.5C7.32843 12 8 11.3284 8 10.5C8 9.67157 7.32843 9 6.5 9H5.5Z"
            fill="#37517e"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 4C0.89543 4 0 4.89543 0 6V18C0 19.1046 0.895431 20 2 20H22C23.1046 20 24 19.1046 24 18V6C24 4.89543 23.1046 4 22 4H2ZM2 6L22 6V9.65675C20.6944 10.0785 19.75 11.304 19.75 12.75C19.75 14.196 20.6944 15.4215 22 15.8433V18H2V6Z"
            fill="#37517e"
          />
        </svg>
      </span>
    ),
    label: 'Card',
    path: '#card-management',
  },
  {
    hidden: false,
    type: 'call-to-action',
    icon: (
      <span className="tw-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5548 13.6119L16.0486 5.87567L17.3103 9.34209L19.1896 8.65805L16.7955 2.0802L15.3658 2.60058L15.3387 2.58836L15.3268 2.61478L10.2177 4.47434L10.9017 6.35373L14.1765 5.1618L10.7324 12.7879C11.3917 12.9585 12.0062 13.2402 12.5548 13.6119Z"
            fill="#FFFFFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 18.5C12.75 20.433 11.183 22 9.25 22C7.317 22 5.75 20.433 5.75 18.5C5.75 16.567 7.317 15 9.25 15C11.183 15 12.75 16.567 12.75 18.5ZM10.75 18.5C10.75 19.3284 10.0784 20 9.25 20C8.42157 20 7.75 19.3284 7.75 18.5C7.75 17.6715 8.42157 17 9.25 17C10.0784 17 10.75 17.6715 10.75 18.5Z"
            fill="#FFFFFF"
          />
        </svg>
      </span>
    ),
    label: 'Send',
    path: '#send',
  },
  {
    hidden: false,
    icon: (
      <span className="tw-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.4999 2C14.0509 2 12.7618 2.68491 11.9387 3.74866C12.5157 4.09437 13.0363 4.52444 13.4836 5.02181C13.9386 4.4022 14.6723 4 15.4999 4C16.8807 4 17.9999 5.11929 17.9999 6.5C17.9999 7.88071 16.8807 9 15.4999 9C15.3916 9 15.2848 8.9931 15.1801 8.97973C15.1932 9.15144 15.2 9.32496 15.2 9.50005C15.2 10.0073 15.1436 10.5014 15.0368 10.9765C15.189 10.992 15.3436 11 15.4999 11C17.9852 11 19.9999 8.98528 19.9999 6.5C19.9999 4.01472 17.9852 2 15.4999 2Z"
            fill="#37517e"
          />
          <path
            d="M15.4999 15C15.299 15 15.1032 15.0036 14.9125 15.0106C14.3695 14.7777 13.7636 14.5619 13.0919 14.379C13.5102 13.9852 13.8779 13.5381 14.1842 13.0486C14.6016 13.0171 15.04 13 15.4999 13C18.9027 13 21.1267 13.9336 22.4122 14.7478C23.5927 15.4956 23.9999 16.8088 23.9999 17.9482V19H21.9999V17.9482C21.9999 17.2161 21.7424 16.6911 21.3419 16.4374C20.3692 15.8212 18.5151 15 15.4999 15Z"
            fill="#37517e"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 9.5C4 7.01472 6.01472 5 8.5 5C10.9853 5 13 7.01472 13 9.5C13 11.9853 10.9853 14 8.5 14C6.01472 14 4 11.9853 4 9.5ZM8.5 7C7.11929 7 6 8.11929 6 9.5C6 10.8807 7.11929 12 8.5 12C9.88071 12 11 10.8807 11 9.5C11 8.11929 9.88071 7 8.5 7Z"
            fill="#37517e"
          />
          <path
            d="M17 20.9482V22H15V20.9482C15 20.2161 14.7424 19.6911 14.342 19.4374C13.3692 18.8212 11.5151 18 8.5 18C5.48489 18 3.63077 18.8212 2.65803 19.4374C2.25756 19.6911 2 20.2161 2 20.9482V22H0V20.9482C0 19.8088 0.407265 18.4956 1.58779 17.7478C2.87325 16.9336 5.09725 16 8.5 16C11.9027 16 14.1268 16.9336 15.4122 17.7478C16.5927 18.4956 17 19.8088 17 20.9482Z"
            fill="#37517e"
          />
        </svg>
      </span>
    ),
    label: 'Recipients',
    path: '#recipients',
  },
  {
    hidden: false,
    icon: (
      <span className="tw-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 9V7H17.6632C17.8792 6.54537 18 6.0368 18 5.5C18 3.567 16.433 2 14.5 2C13.5207 2 12.6353 2.40223 12 3.05051C11.3647 2.40223 10.4793 2 9.5 2C7.567 2 6 3.567 6 5.5C6 6.0368 6.12085 6.54537 6.33682 7H2V9H22ZM8 5.5C8 6.32843 8.67157 7 9.5 7H11V5.5C11 4.67157 10.3284 4 9.5 4C8.67157 4 8 4.67157 8 5.5ZM16 5.5C16 6.32843 15.3284 7 14.5 7H13V5.5C13 4.67157 13.6716 4 14.5 4C15.3284 4 16 4.67157 16 5.5Z"
            fill="#37517e"
          />
          <path d="M5 20V11H3V22H21V11H19V20H13V11H11V20H5Z" fill="#37517e" />
        </svg>
      </span>
    ),
    label: 'Invite',
    path: '#invite',
  },
];
