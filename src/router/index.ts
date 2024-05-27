import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '../views/TeamView.vue'
import PokemonDetailView from '@/views/PokemonDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView
    },
    {
      path: '/team/:id',
      name: 'pokemon-detail',
      component: PokemonDetailView
    }
  ]
})

export default router
