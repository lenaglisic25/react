import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import Avatar from '../Avatar'
import {implementsClassName} from '../utils/testing'
import classes from './Avatar.module.css'

describe('Avatar', () => {
  implementsClassName(Avatar, classes.Avatar)

  describe('Avatar data-component attribute', () => {
    it('renders Avatar with data-component attribute', () => {
      render(<Avatar src="primer.png" alt="" data-testid="avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveAttribute('data-component', 'Avatar')
    })
  })

  it('renders small by default', () => {
    const size = 20
    render(<Avatar src="primer.png" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('width', size.toString())
    expect(avatar).toHaveAttribute('height', size.toString())
  })

  it('respects the size prop', () => {
    render(<Avatar size={40} src="primer.png" alt="github" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('width', '40')
    expect(avatar).toHaveAttribute('height', '40')
  })

  it('passes through the src prop', () => {
    render(<Avatar src="primer.png" alt="" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('src', 'primer.png')
  })

  it('renders placeholder text when src is missing', () => {
    render(<Avatar placeholder="JD" alt="Jane Doe" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar.tagName).toBe('SPAN')
    expect(avatar).toHaveTextContent('JD')
    expect(avatar).toHaveAttribute('role', 'img')
    expect(avatar).toHaveAttribute('aria-label', 'Jane Doe')
  })

  it('renders src image instead of placeholder when both props are provided', () => {
    render(<Avatar src="primer.png" placeholder="JD" alt="Jane Doe" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar.tagName).toBe('IMG')
    expect(avatar).toHaveAttribute('src', 'primer.png')
    expect(screen.queryByText('JD')).not.toBeInTheDocument()
  })

  it('applies square styling attribute to placeholder avatar', () => {
    render(<Avatar placeholder="JD" square data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar.tagName).toBe('SPAN')
    expect(avatar).toHaveAttribute('data-square')
  })

  it('should support the `style` prop without overriding internal styles', () => {
    render(
      <Avatar
        data-testid="avatar"
        src="primer.png"
        style={{
          background: 'black',
        }}
      />,
    )

    const avatar = screen.getByTestId('avatar')

    // Test that both the custom CSS property and the style prop are applied
    expect(avatar).toHaveStyle('--avatarSize-regular: 20px')

    // Check that style attribute contains both the custom property and the background
    const styleAttr = avatar.getAttribute('style') || ''
    expect(styleAttr).toContain('--avatarSize-regular: 20px')
    expect(styleAttr).toContain('background: black')
  })
})
