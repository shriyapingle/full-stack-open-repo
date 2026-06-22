
const Notification = ({ message }) => {
    if (message[0] === null || message[0] === '') {
        return null
    }

    return (
        <div className={`${message[1] === 'error' ? 'errorBadge' : 'notificationBadge'}`}>
            {message[0]}
        </div>
    )
}

export default Notification