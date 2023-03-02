import c from 'static-console';

c.reset('module', `My module`);
c.log(`Welcome to 'module' namespace!`);

c.reset('module-task1', `Special task`);
c.log(`Initializing awesome...`);

c.reset('module-task2', `Task #2`);
c.log(`Washing dishes...`);
c.log(`Preparing table...`);

c.reset('module');
c.log(`I'm done`);

c.reset();
c.log(`I think 'My module' done with it!`);