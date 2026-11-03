import {clsx} from 'clsx'
import React from 'react'
import type {ResponsiveValue} from '../hooks/useResponsiveValue'
import {isResponsiveValue} from '../hooks/useResponsiveValue'
import classes from './Avatar.module.css'

export const DEFAULT_AVATAR_SIZE = 20

export type AvatarProps = {
  /** Sets the width and height of the avatar. */
  size?: number | ResponsiveValue<number>
  /** Sets the shape of the avatar to a square if true. */
  square?: boolean
  /** URL of the avatar image. */
  src?: string
  /** Text to display when no image URL is provided. */
  placeholder?: string
  /** Provide accessible text for the avatar. */
  alt?: string
  /** Additional class name. */
  className?: string
} & Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'size' | 'alt' | 'placeholder'>

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  {alt = '', size = DEFAULT_AVATAR_SIZE, square = false, className, style, placeholder, src, ...rest},
  ref,
) {
  const isResponsive = isResponsiveValue(size)
  const cssSizeVars = {} as Record<string, string>

  if (isResponsive) {
    for (const [key, value] of Object.entries(size)) {
      cssSizeVars[`--avatarSize-${key}`] = `${value}px`
    }
  } else {
    cssSizeVars['--avatarSize-regular'] = `${size}px`
  }

  const avatarStyle = {
    ...cssSizeVars,
    ...style,
  } as React.CSSProperties

  const avatarClassName = clsx(className, classes.Avatar)

  const commonProps = {
    'data-component': 'Avatar',
    'data-responsive': isResponsive ? '' : undefined,
    'data-square': square ? '' : undefined,
    className: avatarClassName,
    style: avatarStyle,
  }

  if (!src && placeholder) {
    return (
      <span
        {...commonProps}
        className={clsx(avatarClassName, classes.Placeholder)}
        role="img"
        aria-label={alt || placeholder}
      >
        {placeholder}
      </span>
    )
  }

  return (
    <img
      {...commonProps}
      {...rest}
      ref={ref}
      src={src}
      alt={alt}
      width={isResponsive ? undefined : size}
      height={isResponsive ? undefined : size}
    />
  )
})

if (__DEV__) {
  Avatar.displayName = 'Avatar'
}

export default Avatar

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
  </div>
)
