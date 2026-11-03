import type {Meta, StoryFn} from '@storybook/react-vite'
import type {AvatarProps} from './Avatar'
import Avatar, {DEFAULT_AVATAR_SIZE} from './Avatar'
import {parseSizeFromArgs} from './storyHelpers'

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>

type Args = {
  size?: number
  sizeAtNarrow?: number
  sizeAtRegular?: number
  sizeAtWide?: number
} & Omit<AvatarProps, 'size'>

export const Default = () => <Avatar src="https://avatars.githubusercontent.com/u/7143434?v=4" />

export const Playground: StoryFn<Args> = args => {
  return (
    <Avatar
      size={parseSizeFromArgs(args)}
      square={args.square}
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
      alt="mona"
    />
  )
}

Playground.args = {
  size: DEFAULT_AVATAR_SIZE,
}

Playground.argTypes = {
  size: {
    control: {
      type: 'number',
    },
  },
  sizeAtNarrow: {
    name: 'size.narrow',
    control: {
      type: 'number',
    },
  },
  sizeAtRegular: {
    name: 'size.regular',
    control: {
      type: 'number',
    },
  },
  sizeAtWide: {
    name: 'size.wide',
    control: {
      type: 'number',
    },
  },
  alt: {
    controls: false,
    table: {
      disable: true,
    },
  },
}

export const PlaceholderExamples = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '24px',
      flexWrap: 'wrap',
    }}
  >
    <Avatar placeholder="S" size={24} />
    <Avatar placeholder="M" size={32} />
    <Avatar placeholder="L" size={40} />
    <Avatar placeholder="XL" size={56} />
    <Avatar placeholder="XXL" size={72} />
    <Avatar placeholder="JD" size={56} square />
    <Avatar
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
      placeholder="TEST"
      size={56}
    />
  </div>
)
