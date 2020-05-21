'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { ok: true }
})

Route.post('users', 'UserController.store')

Route.post('login', 'SessionController.store')

Route.group(() => {
  Route.post('projects', 'ProjectController.store')
    .validator('StoreProject')
  Route.get('projects', 'ProjectController.index')
  Route.put('projects/:project_id', 'ProjectController.update')
    .validator('UpdateProject')

  Route.get('activities', 'AllActivitiesController.index')
  Route.get('projects/:project_id/activities', 'ActivityController.index')
  Route.get('projects/:project_id/activities/toDo', 'ActivityToDoController.index')
  Route.get('projects/:project_id/activities/done', 'ActivityDoneController.index')
  Route.get('projects/:project_id/activities/doing', 'ActivityDoingController.index')
  Route.get('projects/:project_id/activities/stopped', 'ActivityStoppedController.index')
  Route.get('projects/:project_id/activities/paused', 'ActivityPausedController.index')
  Route.post('projects/:project_id/activities', 'ActivityController.store')
    .validator('StoreActivity')
  Route.put('projects/:project_id/activities/:activity_id', 'ActivityController.update')
    .validator('UpdateActivity')
  Route.get('projects/:project_id/interruptions', 'InterruptionController.index')
  Route.post('projects/:project_id/activities/:activity_id/interruptions', 'InterruptionController.store')
}).middleware(['auth'])
