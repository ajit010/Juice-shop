import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategoryFilterComponent } from './category-filter.component'
import { EnrichedChallenge } from 'src/app/score-board-preview/types/EnrichedChallenge'

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent
  let fixture: ComponentFixture<CategoryFilterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFilterComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(CategoryFilterComponent)
    component = fixture.componentInstance

    component.allChallenges = [
      { category: 'category-one' } as EnrichedChallenge,
      { category: 'category-one' } as EnrichedChallenge,
      { category: 'category-two' } as EnrichedChallenge,
      { category: 'category-three' } as EnrichedChallenge
    ]
    component.categories = new Set()
    fixture.detectChanges()
  })

  it('should extract all categories from passed in challenges', () => {
    const availableCategories = CategoryFilterComponent.getAvailableCategories(component.allChallenges)
    expect(availableCategories).toContain('category-one')
    expect(availableCategories).toContain('category-two')
    expect(availableCategories).toContain('category-three')
  })

  it('toggle should add and remove selected categories', () => {
    component.toggleCategorySelected('category-one')
    expect(component.categories).toContain('category-one')
    expect(component.isCategorySelected('category-one')).toBe(true)
    component.toggleCategorySelected('category-one')
    expect(component.categories).not.toContain('category-one')
    expect(component.isCategorySelected('category-one')).toBe(false)
  })

  it('reset should clear categories', () => {
    component.toggleCategorySelected('category-one')
    component.toggleCategorySelected('category-two')
    expect(component.isAllCategoriesSelected()).toBe(false)
    component.resetCategoryFilter()
    expect(component.isAllCategoriesSelected()).toBe(true)
  })
})