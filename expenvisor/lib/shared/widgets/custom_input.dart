import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_spacing.dart';

/// Custom input field widget with Midnight Aurora styling
///
/// Supports different input types, validation, and custom styling
class CustomInput extends StatefulWidget {
  final String? label;
  final String? hint;
  final String? helperText;
  final String? errorText;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final bool obscureText;
  final bool enabled;
  final bool readOnly;
  final int? maxLines;
  final int? maxLength;
  final InputType type;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final VoidCallback? onSuffixTap;
  final VoidCallback? onTap;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final VoidCallback? onEditingComplete;
  final FocusNode? focusNode;
  final List<TextInputFormatter>? inputFormatters;
  final String? Function(String?)? validator;
  final bool autofocus;
  final TextCapitalization textCapitalization;
  final Widget? prefix;
  final Widget? suffix;

  const CustomInput({
    super.key,
    this.label,
    this.hint,
    this.helperText,
    this.errorText,
    this.controller,
    this.keyboardType,
    this.textInputAction,
    this.obscureText = false,
    this.enabled = true,
    this.readOnly = false,
    this.maxLines = 1,
    this.maxLength,
    this.type = InputType.outlined,
    this.prefixIcon,
    this.suffixIcon,
    this.onSuffixTap,
    this.onTap,
    this.onChanged,
    this.onSubmitted,
    this.onEditingComplete,
    this.focusNode,
    this.inputFormatters,
    this.validator,
    this.autofocus = false,
    this.textCapitalization = TextCapitalization.none,
    this.prefix,
    this.suffix,
  });

  @override
  State<CustomInput> createState() => _CustomInputState();
}

class _CustomInputState extends State<CustomInput> {
  bool _obscureText = false;
  late FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.obscureText;
    _focusNode = widget.focusNode ?? FocusNode();
  }

  @override
  void dispose() {
    if (widget.focusNode == null) {
      _focusNode.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: AppTypography.labelMedium(
              color: Theme.of(context).textTheme.labelMedium?.color,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
        ],
        TextFormField(
          controller: widget.controller,
          keyboardType: widget.keyboardType,
          textInputAction: widget.textInputAction,
          obscureText: _obscureText,
          enabled: widget.enabled,
          readOnly: widget.readOnly,
          maxLines: widget.maxLines,
          maxLength: widget.maxLength,
          onTap: widget.onTap,
          onChanged: widget.onChanged,
          onFieldSubmitted: widget.onSubmitted,
          onEditingComplete: widget.onEditingComplete,
          focusNode: _focusNode,
          inputFormatters: widget.inputFormatters,
          validator: widget.validator,
          autofocus: widget.autofocus,
          textCapitalization: widget.textCapitalization,
          style: AppTypography.bodyMedium(
            color: Theme.of(context).textTheme.bodyMedium?.color,
          ),
          decoration: _buildDecoration(context),
        ),
        if (widget.helperText != null && widget.errorText == null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(
            widget.helperText!,
            style: AppTypography.bodySmall(
              color: Theme.of(context)
                  .textTheme
                  .bodySmall
                  ?.color
                  ?.withOpacity(0.7),
            ),
          ),
        ],
        if (widget.errorText != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(
            widget.errorText!,
            style: AppTypography.bodySmall(
              color: AppColors.error,
            ),
          ),
        ],
      ],
    );
  }

  InputDecoration _buildDecoration(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return InputDecoration(
      hintText: widget.hint,
      hintStyle: AppTypography.bodyMedium(
        color: Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.5),
      ),
      prefixIcon: widget.prefixIcon != null
          ? Icon(widget.prefixIcon, color: AppColors.primary)
          : widget.prefix,
      suffixIcon: _buildSuffixIcon(context),
      filled: widget.type == InputType.filled,
      fillColor: widget.type == InputType.filled
          ? (isDark ? AppColors.surfaceDark : AppColors.surfaceLight)
          : null,
      border: _getBorder(),
      enabledBorder: _getBorder(),
      focusedBorder: _getFocusedBorder(),
      errorBorder: _getErrorBorder(),
      focusedErrorBorder: _getFocusedErrorBorder(),
      disabledBorder: _getDisabledBorder(),
      contentPadding: EdgeInsets.symmetric(
        horizontal: widget.prefixIcon != null || widget.prefix != null
            ? AppSpacing.md
            : AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      counterText: widget.maxLength != null ? null : '',
    );
  }

  Widget? _buildSuffixIcon(BuildContext context) {
    if (widget.obscureText) {
      return IconButton(
        icon: Icon(
          _obscureText ? Icons.visibility_off : Icons.visibility,
          color: AppColors.textTertiaryLight,
        ),
        onPressed: () {
          setState(() {
            _obscureText = !_obscureText;
          });
        },
      );
    }

    if (widget.suffixIcon != null) {
      return IconButton(
        icon: Icon(
          widget.suffixIcon,
          color: AppColors.textTertiaryLight,
        ),
        onPressed: widget.onSuffixTap,
      );
    }

    return widget.suffix;
  }

  InputBorder _getBorder() {
    switch (widget.type) {
      case InputType.outlined:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.borderLight),
        );
      case InputType.filled:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: BorderSide.none,
        );
      case InputType.underlined:
        return const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.borderLight),
        );
    }
  }

  InputBorder _getFocusedBorder() {
    switch (widget.type) {
      case InputType.outlined:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        );
      case InputType.filled:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        );
      case InputType.underlined:
        return const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.primary, width: 2),
        );
    }
  }

  InputBorder _getErrorBorder() {
    switch (widget.type) {
      case InputType.outlined:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.error),
        );
      case InputType.filled:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.error),
        );
      case InputType.underlined:
        return const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.error),
        );
    }
  }

  InputBorder _getFocusedErrorBorder() {
    switch (widget.type) {
      case InputType.outlined:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        );
      case InputType.filled:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        );
      case InputType.underlined:
        return const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.error, width: 2),
        );
    }
  }

  InputBorder _getDisabledBorder() {
    switch (widget.type) {
      case InputType.outlined:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide:
              const BorderSide(color: AppColors.borderLight, width: 0.5),
        );
      case InputType.filled:
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
          borderSide: BorderSide.none,
        );
      case InputType.underlined:
        return const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.borderLight, width: 0.5),
        );
    }
  }
}

/// Input field types
enum InputType {
  outlined,
  filled,
  underlined,
}

/// Specialized amount input field
class AmountInput extends StatelessWidget {
  final String? label;
  final String? hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final String? Function(String?)? validator;
  final bool enabled;
  final String? errorText;

  const AmountInput({
    super.key,
    this.label,
    this.hint,
    this.controller,
    this.onChanged,
    this.validator,
    this.enabled = true,
    this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    return CustomInput(
      label: label,
      hint: hint ?? '0.00',
      controller: controller,
      onChanged: onChanged,
      validator: validator,
      enabled: enabled,
      errorText: errorText,
      keyboardType: const TextInputType.numberWithOptions(decimal: true),
      textInputAction: TextInputAction.done,
      prefixIcon: Icons.attach_money,
      inputFormatters: [
        FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
        LengthLimitingTextInputFormatter(10),
      ],
    );
  }
}

/// Specialized search input field
class SearchInput extends StatelessWidget {
  final String? hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onClear;
  final bool showClearButton;

  const SearchInput({
    super.key,
    this.hint,
    this.controller,
    this.onChanged,
    this.onClear,
    this.showClearButton = true,
  });

  @override
  Widget build(BuildContext context) {
    return CustomInput(
      hint: hint ?? 'Search...',
      controller: controller,
      onChanged: onChanged,
      prefixIcon: Icons.search,
      suffixIcon: showClearButton && (controller?.text.isNotEmpty ?? false)
          ? Icons.clear
          : null,
      onSuffixTap: onClear,
      textInputAction: TextInputAction.search,
    );
  }
}

/// Specialized password input field
class PasswordInput extends StatelessWidget {
  final String? label;
  final String? hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final String? Function(String?)? validator;
  final bool enabled;
  final String? errorText;

  const PasswordInput({
    super.key,
    this.label,
    this.hint,
    this.controller,
    this.onChanged,
    this.validator,
    this.enabled = true,
    this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    return CustomInput(
      label: label,
      hint: hint ?? 'Enter password',
      controller: controller,
      onChanged: onChanged,
      validator: validator,
      enabled: enabled,
      errorText: errorText,
      obscureText: true,
      textInputAction: TextInputAction.done,
      prefixIcon: Icons.lock_outline,
    );
  }
}
