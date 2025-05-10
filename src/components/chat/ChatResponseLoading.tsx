import { Skeleton } from '@progress/kendo-react-indicators';
export const ChatResponseLoading = () => {
  return (
      <div className='chat-respose-loading'>
          <li>
              <div className='shader chat-response-loading-shader'>
                  <Skeleton shape={'text'} style={{ width: '100%' }} />
                  <Skeleton shape={'text'} style={{ width: '20%' }} />
                  <Skeleton shape={'text'} style={{ width: '60%' }} />
              </div>
          </li>
      </div>
  )
}