import { Typography } from '@progress/kendo-react-common';
import { Fade } from '@progress/kendo-react-animation';
export const ChatHeader = () => {
  return (
      <div>
          <Typography.h3 fontWeight='bold'>
              <Fade appear={true} transitionEnterDuration={500}>🔮 Hi There!</Fade>
          </Typography.h3>
          <Typography.h2 fontWeight='bold'>
              <Fade appear={true} transitionEnterDuration={800}>What Do You Want To Plan Today?</Fade>
          </Typography.h2>
      </div>
  )
}