import slugify from 'slugify';

export const slugifyText = (text: string): string => {
	return slugify(text, {
		strict: true,
		lower: true,
		trim: true
	});
};
