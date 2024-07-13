const LogoutIcon = ({cor, size, className}) => {
    return (
      <div className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={cor} viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"/><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/></svg>
      </div>
    )
  }
  
  export default LogoutIcon;