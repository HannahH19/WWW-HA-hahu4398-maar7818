import * as model from "./model.js";
/**
 * Shows addExponateForm
 * @param {Context} ctx
 */
export async function addRender(ctx) {
  await ctx.render("addExponatForm", { form: ctx.body });
}

/**
 * Shows editExponateForm
 * @param {Context} ctx
 */
export async function editRender(ctx) {
  const data = await model.getById(ctx.db, ctx.params.ID);
  if (!data) {
    ctx.status = 404;
  }
  await renderForm(ctx, data);
}

/**
 * Renders Form with exponate information
 * @param {Context} ctx
 */
export async function renderForm(ctx, formData) {
  await ctx.render("addExponatForm", { form: formData });
}

/**
 * Edits exponate
 * @param {Context} ctx
 */
export async function edit(ctx) {
  const data = await model.getById(ctx.db, ctx.params.ID);
  const title = ctx.body.title;
  const description = ctx.body.description;
  const teacher = ctx.body.teacher;
  const students = ctx.body.students;
  const course = ctx.body.course;
  const semester = ctx.body.semester;
  const modul = ctx.body.modul;
  const id = ctx.body.ID;
  const image = ctx.body.image;

  const exponat = {
    id,
    title,
    description,
    teacher,
    students,
    course,
    semester,
    modul,
    image,
  };
  if (ctx.params.ID) {
    model.update(ctx.db, ctx.params.ID, exponat);
    console.log("Update");
    ctx.redirect("/"); //bookmark/" + ctx.params.ID);
  } else {
    const id = await model.add(ctx.db, data);
    //ctx.redirect("/");
  }
}
