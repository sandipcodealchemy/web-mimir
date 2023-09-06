import * as React from 'react'

const LP = ({ check }) => (
  <>
    {!check ? (
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_5_1493)">
          <path
            d="M4.51172 5.6543H11.9238C12.2656 5.6543 12.5195 5.39062 12.5195 5.04883C12.5195 4.7168 12.2656 4.45312 11.9238 4.45312H4.51172C4.16016 4.45312 3.90625 4.7168 3.90625 5.04883C3.90625 5.39062 4.16016 5.6543 4.51172 5.6543ZM4.51172 9.0625H11.9238C12.2656 9.0625 12.5195 8.79883 12.5195 8.45703C12.5195 8.125 12.2656 7.86133 11.9238 7.86133H4.51172C4.16016 7.86133 3.90625 8.125 3.90625 8.45703C3.90625 8.79883 4.16016 9.0625 4.51172 9.0625ZM4.51172 12.4707H8.01758C8.36914 12.4707 8.62305 12.2168 8.62305 11.8848C8.62305 11.5332 8.36914 11.2695 8.01758 11.2695H4.51172C4.16016 11.2695 3.90625 11.5332 3.90625 11.8848C3.90625 12.2168 4.16016 12.4707 4.51172 12.4707ZM0 17.8809C0 19.9219 1.00586 20.9375 3.02734 20.9375H13.3984C15.4199 20.9375 16.4258 19.9219 16.4258 17.8809V3.06641C16.4258 1.03516 15.4199 0 13.3984 0H3.02734C1.00586 0 0 1.03516 0 3.06641V17.8809ZM1.57227 17.8516V3.0957C1.57227 2.11914 2.08984 1.57227 3.10547 1.57227H13.3203C14.3359 1.57227 14.8535 2.11914 14.8535 3.0957V17.8516C14.8535 18.8281 14.3359 19.3652 13.3203 19.3652H3.10547C2.08984 19.3652 1.57227 18.8281 1.57227 17.8516Z"
            fill="#7A8890"
          />
        </g>
        <defs>
          <clipPath id="clip0_5_1493">
            <rect width="16.4258" height="20.9473" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.39453 5.51758C4.0332 5.51758 3.76953 5.23438 3.76953 4.88281C3.76953 4.54102 4.0332 4.27734 4.39453 4.27734H12.041C12.3926 4.27734 12.6562 4.54102 12.6562 4.88281C12.6562 5.23438 12.3926 5.51758 12.041 5.51758H4.39453ZM4.39453 9.0332C4.0332 9.0332 3.76953 8.75 3.76953 8.39844C3.76953 8.05664 4.0332 7.79297 4.39453 7.79297H12.041C12.3926 7.79297 12.6562 8.05664 12.6562 8.39844C12.6562 8.75 12.3926 9.0332 12.041 9.0332H4.39453ZM4.39453 12.5488C4.0332 12.5488 3.76953 12.2754 3.76953 11.9336C3.76953 11.582 4.0332 11.3086 4.39453 11.3086H8.00781C8.37891 11.3086 8.63281 11.582 8.63281 11.9336C8.63281 12.2754 8.37891 12.5488 8.00781 12.5488H4.39453ZM0 17.8809C0 19.9219 1.00586 20.9375 3.02734 20.9375H13.3984C15.4199 20.9375 16.4258 19.9219 16.4258 17.8809V3.06641C16.4258 1.03516 15.4199 0 13.3984 0H3.02734C1.00586 0 0 1.03516 0 3.06641V17.8809Z"
          fill="#E27A2E"
        />
      </svg>
    )}
  </>
)
export default LP
