import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;
  String _selectedPeriod = 'This Month';
  String _selectedChartType = 'Line';

  final List<String> _periods = [
    'This Week',
    'This Month',
    'Last Month',
    'This Year'
  ];
  final List<String> _chartTypes = ['Line', 'Bar', 'Pie'];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Analytics',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          PopupMenuButton<String>(
            onSelected: (period) {
              setState(() {
                _selectedPeriod = period;
              });
            },
            itemBuilder: (context) => _periods.map((period) {
              return PopupMenuItem(
                value: period,
                child: Row(
                  children: [
                    if (period == _selectedPeriod)
                      const Icon(Icons.check,
                          size: 16, color: AppColors.primary),
                    const SizedBox(width: 8),
                    Text(period),
                  ],
                ),
              );
            }).toList(),
            child: Container(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md, vertical: AppSpacing.sm),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(_selectedPeriod),
                  const SizedBox(width: 4),
                  const Icon(Icons.arrow_drop_down, size: 16),
                ],
              ),
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Overview'),
            Tab(text: 'Categories'),
            Tab(text: 'Trends'),
          ],
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textTertiaryLight,
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOverviewTab(isDark),
          _buildCategoriesTab(isDark),
          _buildTrendsTab(isDark),
        ],
      ),
    );
  }

  Widget _buildOverviewTab(bool isDark) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        children: [
          // Summary Cards
          _buildSummaryCards(isDark),

          const SizedBox(height: AppSpacing.xl),

          // Income vs Expense Chart
          _buildIncomeExpenseChart(isDark),

          const SizedBox(height: AppSpacing.xl),

          // Monthly Trend Chart
          _buildMonthlyTrendChart(isDark),

          const SizedBox(height: AppSpacing.xl),

          // Quick Stats
          _buildQuickStats(isDark),
        ],
      ),
    );
  }

  Widget _buildCategoriesTab(bool isDark) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        children: [
          // Category Pie Chart
          _buildCategoryPieChart(isDark),

          const SizedBox(height: AppSpacing.xl),

          // Category List
          _buildCategoryList(isDark),
        ],
      ),
    );
  }

  Widget _buildTrendsTab(bool isDark) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        children: [
          // Chart Type Selector
          _buildChartTypeSelector(isDark),

          const SizedBox(height: AppSpacing.lg),

          // Trend Chart
          _buildTrendChart(isDark),

          const SizedBox(height: AppSpacing.xl),

          // Insights
          _buildInsights(isDark),
        ],
      ),
    );
  }

  Widget _buildSummaryCards(bool isDark) {
    return Row(
      children: [
        Expanded(
          child: StatsCard(
            title: 'Total Income',
            value: '\$4,250',
            subtitle: '+12% from last month',
            icon: Icons.trending_up,
            iconColor: AppColors.income,
          ),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: StatsCard(
            title: 'Total Expenses',
            value: '\$2,890',
            subtitle: '-8% from last month',
            icon: Icons.trending_down,
            iconColor: AppColors.expense,
          ),
        ),
      ],
    )
        .animate()
        .fadeIn(
          duration: 600.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
        );
  }

  Widget _buildIncomeExpenseChart(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Income vs Expenses',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: 200,
            child: BarChart(
              BarChartData(
                alignment: BarChartAlignment.spaceAround,
                maxY: 5000,
                barTouchData: BarTouchData(enabled: false),
                titlesData: FlTitlesData(
                  show: true,
                  rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        const style = TextStyle(fontSize: 12);
                        switch (value.toInt()) {
                          case 0:
                            return const Text('Jan', style: style);
                          case 1:
                            return const Text('Feb', style: style);
                          case 2:
                            return const Text('Mar', style: style);
                          case 3:
                            return const Text('Apr', style: style);
                          case 4:
                            return const Text('May', style: style);
                          case 5:
                            return const Text('Jun', style: style);
                          default:
                            return const Text('', style: style);
                        }
                      },
                    ),
                  ),
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        return Text(
                          '\$${(value / 1000).toStringAsFixed(1)}k',
                          style: const TextStyle(fontSize: 12),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                barGroups: [
                  BarChartGroupData(
                    x: 0,
                    barRods: [
                      BarChartRodData(
                        toY: 3500,
                        color: AppColors.income,
                        width: 16,
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(4),
                          topRight: Radius.circular(4),
                        ),
                      ),
                      BarChartRodData(
                        toY: 2800,
                        color: AppColors.expense,
                        width: 16,
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(4),
                          topRight: Radius.circular(4),
                        ),
                      ),
                    ],
                  ),
                  BarChartGroupData(
                    x: 1,
                    barRods: [
                      BarChartRodData(
                          toY: 4200, color: AppColors.income, width: 16),
                      BarChartRodData(
                          toY: 3200, color: AppColors.expense, width: 16),
                    ],
                  ),
                  BarChartGroupData(
                    x: 2,
                    barRods: [
                      BarChartRodData(
                          toY: 3800, color: AppColors.income, width: 16),
                      BarChartRodData(
                          toY: 2900, color: AppColors.expense, width: 16),
                    ],
                  ),
                  BarChartGroupData(
                    x: 3,
                    barRods: [
                      BarChartRodData(
                          toY: 4500, color: AppColors.income, width: 16),
                      BarChartRodData(
                          toY: 3100, color: AppColors.expense, width: 16),
                    ],
                  ),
                  BarChartGroupData(
                    x: 4,
                    barRods: [
                      BarChartRodData(
                          toY: 4000, color: AppColors.income, width: 16),
                      BarChartRodData(
                          toY: 2800, color: AppColors.expense, width: 16),
                    ],
                  ),
                  BarChartGroupData(
                    x: 5,
                    barRods: [
                      BarChartRodData(
                          toY: 4250, color: AppColors.income, width: 16),
                      BarChartRodData(
                          toY: 2890, color: AppColors.expense, width: 16),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
          delay: 200.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 200.ms,
        );
  }

  Widget _buildMonthlyTrendChart(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Monthly Trend',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: 200,
            child: LineChart(
              LineChartData(
                gridData: FlGridData(show: false),
                titlesData: FlTitlesData(
                  show: true,
                  rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        const style = TextStyle(fontSize: 12);
                        switch (value.toInt()) {
                          case 0:
                            return const Text('Jan', style: style);
                          case 1:
                            return const Text('Feb', style: style);
                          case 2:
                            return const Text('Mar', style: style);
                          case 3:
                            return const Text('Apr', style: style);
                          case 4:
                            return const Text('May', style: style);
                          case 5:
                            return const Text('Jun', style: style);
                          default:
                            return const Text('', style: style);
                        }
                      },
                    ),
                  ),
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        return Text(
                          '\$${(value / 1000).toStringAsFixed(1)}k',
                          style: const TextStyle(fontSize: 12),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                lineBarsData: [
                  LineChartBarData(
                    spots: const [
                      FlSpot(0, 3500),
                      FlSpot(1, 4200),
                      FlSpot(2, 3800),
                      FlSpot(3, 4500),
                      FlSpot(4, 4000),
                      FlSpot(5, 4250),
                    ],
                    isCurved: true,
                    color: AppColors.income,
                    barWidth: 3,
                    isStrokeCapRound: true,
                    dotData: FlDotData(show: true),
                    belowBarData: BarAreaData(
                      show: true,
                      color: AppColors.income.withOpacity(0.1),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
          delay: 400.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 400.ms,
        );
  }

  Widget _buildQuickStats(bool isDark) {
    return Row(
      children: [
        Expanded(
          child: StatsCard(
            title: 'Savings Rate',
            value: '32%',
            subtitle: 'of total income',
            icon: Icons.savings,
            iconColor: AppColors.success,
          ),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: StatsCard(
            title: 'Avg Daily',
            value: '\$96',
            subtitle: 'spending per day',
            icon: Icons.today,
            iconColor: AppColors.info,
          ),
        ),
      ],
    )
        .animate()
        .fadeIn(
          duration: 600.ms,
          delay: 600.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 600.ms,
        );
  }

  Widget _buildCategoryPieChart(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Expenses by Category',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: 250,
            child: PieChart(
              PieChartData(
                sectionsSpace: 2,
                centerSpaceRadius: 60,
                sections: [
                  PieChartSectionData(
                    color: AppColors.expense,
                    value: 30,
                    title: '30%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.info,
                    value: 25,
                    title: '25%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.secondary,
                    value: 20,
                    title: '20%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.warning,
                    value: 15,
                    title: '15%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.primary,
                    value: 10,
                    title: '10%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
        );
  }

  Widget _buildCategoryList(bool isDark) {
    final categories = [
      {
        'name': 'Food & Dining',
        'amount': '\$867',
        'percentage': '30%',
        'color': AppColors.expense
      },
      {
        'name': 'Transportation',
        'amount': '\$722',
        'percentage': '25%',
        'color': AppColors.info
      },
      {
        'name': 'Shopping',
        'amount': '\$578',
        'percentage': '20%',
        'color': AppColors.secondary
      },
      {
        'name': 'Entertainment',
        'amount': '\$433',
        'percentage': '15%',
        'color': AppColors.warning
      },
      {
        'name': 'Utilities',
        'amount': '\$289',
        'percentage': '10%',
        'color': AppColors.primary
      },
    ];

    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Category Breakdown',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          ...categories.map((category) {
            return Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.md),
              child: Row(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: category['color'] as Color,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Text(
                      category['name'] as String,
                      style: AppTypography.bodyLarge(),
                    ),
                  ),
                  Text(
                    category['amount'] as String,
                    style: AppTypography.bodyLarge(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    category['percentage'] as String,
                    style: AppTypography.bodySmall(
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
          delay: 200.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 200.ms,
        );
  }

  Widget _buildChartTypeSelector(bool isDark) {
    return CustomCard(
      child: Row(
        children: _chartTypes.map((type) {
          final isSelected = _selectedChartType == type;
          return Expanded(
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _selectedChartType = type;
                });
              },
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppColors.primary.withOpacity(0.1)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
                ),
                child: Text(
                  type,
                  textAlign: TextAlign.center,
                  style: AppTypography.labelLarge(
                    color: isSelected ? AppColors.primary : null,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    ).animate().fadeIn(
          duration: 600.ms,
        );
  }

  Widget _buildTrendChart(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Spending Trend',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: 200,
            child: _selectedChartType == 'Line'
                ? _buildLineChart()
                : _selectedChartType == 'Bar'
                    ? _buildBarChart()
                    : _buildPieChart(),
          ),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
          delay: 200.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 200.ms,
        );
  }

  Widget _buildLineChart() {
    return LineChart(
      LineChartData(
        gridData: FlGridData(show: false),
        titlesData: FlTitlesData(show: false),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: const [
              FlSpot(0, 3),
              FlSpot(1, 1),
              FlSpot(2, 4),
              FlSpot(3, 2),
              FlSpot(4, 5),
              FlSpot(5, 3),
            ],
            isCurved: true,
            color: AppColors.primary,
            barWidth: 3,
            isStrokeCapRound: true,
            dotData: FlDotData(show: true),
            belowBarData: BarAreaData(
              show: true,
              color: AppColors.primary.withOpacity(0.1),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBarChart() {
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        maxY: 6,
        barTouchData: BarTouchData(enabled: false),
        titlesData: FlTitlesData(show: false),
        borderData: FlBorderData(show: false),
        barGroups: [
          BarChartGroupData(x: 0, barRods: [
            BarChartRodData(toY: 3, color: AppColors.primary, width: 16)
          ]),
          BarChartGroupData(x: 1, barRods: [
            BarChartRodData(toY: 1, color: AppColors.primary, width: 16)
          ]),
          BarChartGroupData(x: 2, barRods: [
            BarChartRodData(toY: 4, color: AppColors.primary, width: 16)
          ]),
          BarChartGroupData(x: 3, barRods: [
            BarChartRodData(toY: 2, color: AppColors.primary, width: 16)
          ]),
          BarChartGroupData(x: 4, barRods: [
            BarChartRodData(toY: 5, color: AppColors.primary, width: 16)
          ]),
          BarChartGroupData(x: 5, barRods: [
            BarChartRodData(toY: 3, color: AppColors.primary, width: 16)
          ]),
        ],
      ),
    );
  }

  Widget _buildPieChart() {
    return PieChart(
      PieChartData(
        sectionsSpace: 2,
        centerSpaceRadius: 40,
        sections: [
          PieChartSectionData(
              color: AppColors.primary, value: 40, title: '40%', radius: 50),
          PieChartSectionData(
              color: AppColors.secondary, value: 30, title: '30%', radius: 50),
          PieChartSectionData(
              color: AppColors.accent, value: 30, title: '30%', radius: 50),
        ],
      ),
    );
  }

  Widget _buildInsights(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'AI Insights',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildInsightItem(
            icon: Icons.trending_up,
            title: 'Great Job!',
            description: 'Your savings rate increased by 5% this month.',
            color: AppColors.success,
            isDark: isDark,
          ),
          const SizedBox(height: AppSpacing.md),
          _buildInsightItem(
            icon: Icons.warning,
            title: 'Spending Alert',
            description: 'You spent 20% more on dining this week.',
            color: AppColors.warning,
            isDark: isDark,
          ),
          const SizedBox(height: AppSpacing.md),
          _buildInsightItem(
            icon: Icons.lightbulb,
            title: 'Suggestion',
            description: 'Consider setting a monthly dining budget.',
            color: AppColors.info,
            isDark: isDark,
          ),
        ],
      ),
    )
        .animate()
        .fadeIn(
          duration: 800.ms,
          delay: 400.ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 400.ms,
        );
  }

  Widget _buildInsightItem({
    required IconData icon,
    required String title,
    required String description,
    required Color color,
    required bool isDark,
  }) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                description,
                style: AppTypography.bodySmall(
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
