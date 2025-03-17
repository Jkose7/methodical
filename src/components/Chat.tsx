import { TextArea } from '@progress/kendo-react-inputs';
import { SvgIcon } from '@progress/kendo-react-common';
// Individual Icons
import { paperPlaneIcon } from '@progress/kendo-svg-icons';

export const Chat = () => {
    return (
        <div className='chat-planner'>
            <h2>🔮 Hi There!</h2>
            <h1>What Project Do You Want To Plan Today?</h1>
            <section className='chat-planner-container'>
                <TextArea style={{ backgroundColor: '#242424', fontSize: '22px', padding: '1rem 1rem 3rem 1rem', borderRadius: '24px' }} size='large' maxLength={1000} autoSize={true} resizable='none' rows={2} placeholder='I want a planning for my ecommerce website...'/>
                <SvgIcon icon={paperPlaneIcon} size='xxlarge'/>
            </section>
        </div>
    )
}

