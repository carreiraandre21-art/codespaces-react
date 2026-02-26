const { z } = require('zod');
const asyncHandler = require('../../utils/asyncHandler');
const schoolRepository = require('../../repositories/schoolRepository');
const { parsePagination, paginatedResult } = require('../../utils/pagination');

const createSchoolSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    cnpj: z.string().min(14),
    plan: z.string().min(2),
    active: z.boolean().optional()
  })
});

const updateSchoolSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    plan: z.string().min(2).optional(),
    active: z.boolean().optional()
  }),
  params: z.object({ id: z.string().uuid() })
});

const list = asyncHandler(async (req, res) => {
  const { page, pageSize, skip, take } = parsePagination(req.query);
  const [items, total] = await Promise.all([
    schoolRepository.listSchools({ skip, take }),
    schoolRepository.countSchools()
  ]);
  res.json(paginatedResult(items, total, page, pageSize));
});

const create = asyncHandler(async (req, res) => {
  const school = await schoolRepository.createSchool(req.body);
  res.status(201).json(school);
});

const update = asyncHandler(async (req, res) => {
  const school = await schoolRepository.updateSchool(req.params.id, req.body);
  res.json(school);
});

module.exports = { list, create, update, createSchoolSchema, updateSchoolSchema };
