import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ParallaxProvider } from 'react-scroll-parallax'

import HomePage from '~/app/page'
import CategoriesSection from '~/components/home/CategoriesSection'
import Greeting from '~/components/home/Greeting'
import HeroBanner from '~/components/home/HeroBanner'
import HeroContent from '~/components/home/HeroContent'
import RecentPostsSection from '~/components/home/RecentPostsSection'

describe('Home Page Integration Tests', () => {
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
        screen.getAllByRole('heading', { name: /topic highlights/i })[0]
      ).toBeInTheDocument()
    })

    it('renders the Greeting component', () => {
      render(
        <ParallaxProvider>
          <Greeting />
        </ParallaxProvider>
      )
      expect(
        screen.getAllByRole('heading', { name: /welcome !/i })[0]
      ).toBeInTheDocument()
    })

    it('renders the HeroBanner component', () => {
      render(
        <ParallaxProvider>
          <HeroBanner />
        </ParallaxProvider>
      )
      expect(screen.getAllByAltText(/hero banner/i)[0]).toBeInTheDocument()
    })

    it('renders the HeroContent component', () => {
      render(
        <ParallaxProvider>
          <HeroContent />
        </ParallaxProvider>
      )
      expect(screen.getAllByText(/be inspired/i)[0]).toBeInTheDocument()
    })

    it('renders the RecentPostsSection component', () => {
      render(
        <ParallaxProvider>
          <RecentPostsSection />
        </ParallaxProvider>
      )
      expect(
        screen.getAllByRole('heading', { name: /recent posts/i })[0]
      ).toBeInTheDocument()
    })
  })
})
