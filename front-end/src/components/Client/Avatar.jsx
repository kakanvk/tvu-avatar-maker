
import './Client.css'

function Avatar(props) {

    const { src, size=50 } = props;

    return (
        <div className='Avatar'>
            <img src={src} alt="" width={size}/>
        </div>
    )
}

export default Avatar
