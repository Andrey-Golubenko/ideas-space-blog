import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { cleanup } from '~/tests/test-utils'

import HomePage from '~/app/page'
import CategoriesSection from '~/components/home/CategoriesSection'
import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContent from '~/components/home/HeroContent'
import RecentPostsSection from '~/components/home/RecentPostsSection'

describe('Home Page Integration Tests', () => {
  beforeEach(() => {
    vi.resetModules()
    cleanup()
  })

  it('renders the home page without crashing', () => {
    render(
      <ParallaxProvider>
        <HomePage />
      </ParallaxProvider>
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  describe('Home Page Components', () => {
    it('renders the CategoriesSection component', () => {
      render(
        <ParallaxProvider>
          <CategoriesSection />
        </ParallaxProvider>
      )
      expect(
        screen.getByRole('heading', { name: /topic highlights/i })
      ).toBeInTheDocument()
    })

    it('renders the Greeting component', () => {
      render(
        <ParallaxProvider>
          <Greeting />
        </ParallaxProvider>
      )
      expect(
        screen.getByRole('heading', { name: /welcome !/i })
      ).toBeInTheDocument()
    })

    it('renders the HeroBanner component', () => {
      render(
        <ParallaxProvider>
          <HeroBanner />
        </ParallaxProvider>
      )
      expect(screen.getByAltText(/hero banner/i)).toBeInTheDocument()
    })

    it('renders the HeroContent component', () => {
      render(
        <ParallaxProvider>
          <HeroContent />
        </ParallaxProvider>
      )
      expect(screen.getByText(/be inspired/i)).toBeInTheDocument()
    })

    it('renders the RecentPostsSection component', () => {
      render(
        <ParallaxProvider>
          <RecentPostsSection />
        </ParallaxProvider>
      )
      expect(
        screen.getByRole('heading', { name: /recent posts/i })
      ).toBeInTheDocument()
    })
  })
})
