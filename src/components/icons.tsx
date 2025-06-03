import { SVGProps } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Search,
  BookText,
  ClipboardEdit,
  Lightbulb,
  Brain,
  GitCompareArrows,
  MessageCircleQuestion,
  DraftingCompass,
  Clock,
  Target,
  X,
} from 'lucide-react';

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className} // Apply className prop here
    >
      <g clipPath="url(#clip0_42_6977)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 4.36362C24 6.00654 21.5032 7.43742 17.814 8.18184C21.5032 8.9262 24 10.3571 24 12C24 13.6429 21.5032 15.0738 17.814 15.8182C21.5032 16.5626 24 17.9935 24 19.6364C24 22.0463 18.6274 24 12 24C5.37258 24 0 22.0463 0 19.6364C0 17.9935 2.49686 16.5626 6.186 15.8182C2.49686 15.0738 0 13.6429 0 12C0 10.3571 2.49686 8.9262 6.186 8.18184C2.49686 7.43742 0 6.00654 0 4.36362C0 1.95367 5.37258 0 12 0C18.6274 0 24 1.95367 24 4.36362Z"
          fill="url(#paint0_linear_42_6977)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_42_6977"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ACFF38" />
          <stop offset="1" stopColor="#1D8828" />
        </linearGradient>
        <clipPath id="clip0_42_6977">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  google: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 9.6735 21.8055 10.0415Z"
        fill="#FFC107"
      />
      <path
        d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
        fill="#FF3D00"
      />
      <path
        d="M12.0002 22C14.5832 22 16.9302 21.0115 18.7047 19.404L15.6097 16.785C14.6058 17.5452 13.3576 17.9969 12.0002 18C9.39916 18 7.19066 16.3415 6.35866 14.027L3.09766 16.5395C4.75266 19.778 8.11366 22 12.0002 22Z"
        fill="#4CAF50"
      />
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 15.7855L15.6095 15.7845L18.7045 18.4035C18.4855 18.6025 22 16 22 12C22 11.3295 21.931 9.6735 21.8055 10.0415Z"
        fill="#1976D2"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  arrowLeft: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  mail: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  lock: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  user: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  eye: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  eyeOff: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  ),
  loader: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${props.className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  menu: (props: IconProps) => <Menu {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
  search: (props: IconProps) => <Search {...props} />,
  bookText: (props: IconProps) => <BookText {...props} />,
  clipboardEdit: (props: IconProps) => <ClipboardEdit {...props} />,
  lightbulb: (props: IconProps) => <Lightbulb {...props} />,
  brain: (props: IconProps) => <Brain {...props} />,
  gitCompareArrows: (props: IconProps) => <GitCompareArrows {...props} />,
  messageCircleQuestion: (props: IconProps) => <MessageCircleQuestion {...props} />,
  draftingCompass: (props: IconProps) => <DraftingCompass {...props} />,
  clock: (props: IconProps) => <Clock {...props} />,
  target: (props: IconProps) => <Target {...props} />,
  x: (props: IconProps) => <X {...props} />,
};
