# Contributing to Transforge-X

Thank you for your interest in contributing to Transforge-X! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please treat all contributors with respect and create a welcoming environment for everyone.

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git

### Setting up the development environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/OmarThegrey/Transforge-X.git
   cd Transforge-X
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all components are properly typed

### Windows 95 Design System

When adding new UI components, ensure they follow the Windows 95 aesthetic:

- Use the established color palette (win95-gray, win95-darkgray, etc.)
- Follow the border styling conventions (raised/sunken effects)
- Use the MS Sans Serif font family
- Maintain consistent spacing and sizing
- Test hover and active states

### File Structure

- Components go in `src/components/`
- Services and utilities go in `src/services/`
- Types go in `src/types/`
- Follow the existing naming conventions

### Testing

- Test your changes thoroughly in multiple browsers
- Verify file conversion functionality works as expected
- Check that the Windows 95 styling is consistent
- Test responsive behavior on different screen sizes

## Submitting Changes

### Pull Request Process

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Reference any related issues
- Ensure your code passes linting
- Test your changes thoroughly

### Commit Message Format

Use clear, descriptive commit messages:

- `feat: add new file format support`
- `fix: resolve conversion progress bar issue`
- `style: improve Windows 95 button styling`
- `docs: update README with new features`

## Types of Contributions

### Bug Fixes

- Check existing issues before creating a new one
- Provide detailed reproduction steps
- Include browser and OS information
- Test your fix thoroughly

### New Features

- Discuss major features in an issue first
- Ensure new features fit the Windows 95 aesthetic
- Add appropriate documentation
- Consider backward compatibility

### Documentation

- Improve README clarity
- Add code comments
- Update API documentation
- Fix typos and grammar

### File Format Support

When adding new file format support:

- Update the `FileConverter` service
- Add the format to supported lists in components
- Update documentation
- Test conversion quality and performance
- Consider browser compatibility

## File Conversion Guidelines

### Adding New Formats

1. Update `src/services/FileConverter.ts`
2. Add MIME type mapping in `getMimeType()`
3. Implement conversion logic in appropriate method
4. Update supported formats in components
5. Add format to documentation

### Conversion Quality

- Prioritize conversion accuracy
- Provide quality settings where applicable
- Handle errors gracefully
- Show meaningful progress feedback
- Consider file size limitations

## Performance Considerations

- Optimize for large file handling
- Use Web Workers for heavy processing when possible
- Implement proper error handling
- Consider memory usage for batch operations
- Test with various file sizes

## Browser Compatibility

Ensure changes work across supported browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Getting Help

- Check existing issues and documentation
- Ask questions in issue discussions
- Reach out to maintainers for guidance

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments

Thank you for contributing to Transforge-X! Your efforts help maintain the nostalgic Windows 95 experience while providing modern file conversion capabilities.